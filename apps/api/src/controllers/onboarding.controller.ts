import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

const ONBOARDING_UPDATE_SCHEMA = z.object({
    step: z.number().int().min(1).max(4),
    profession: z.string().optional(),
    goal: z.string().optional(),
    interests: z.array(z.string()).optional(),
});

export const updateOnboardingState = async (req: Request, res: Response) => {
    try {
        const parseResult = ONBOARDING_UPDATE_SCHEMA.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.format() });
        }

        const data = parseResult.data;
        const userEmail = 'demo@local.dev';

        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const state = await prisma.onboardingState.upsert({
            where: { userId: user.id },
            update: {
                step: data.step,
                profession: data.profession,
                goal: data.goal,
                interests: data.interests,
            },
            create: {
                userId: user.id,
                step: data.step,
                profession: data.profession,
                goal: data.goal,
                interests: data.interests ?? [],
            },
        });

        res.json(state);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const completeOnboarding = async (req: Request, res: Response) => {
    try {
        const userEmail = 'demo@local.dev';
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            include: { onboardingState: true }
        });

        if (!user || !user.onboardingState) {
            return res.status(400).json({ error: 'Onboarding session not found' });
        }

        // Generate initial topics based on interests/profession
        const interests = user.onboardingState.interests;
        const profession = user.onboardingState.profession;

        const initialTopics = [...new Set([...interests, profession])].filter(Boolean) as string[];

        for (const topicName of initialTopics) {
            await prisma.topic.upsert({
                where: { userId_name: { userId: user.id, name: topicName } },
                update: {},
                create: { userId: user.id, name: topicName }
            });
        }

        const updatedState = await prisma.onboardingState.update({
            where: { userId: user.id },
            data: { completed: true, step: 4 }
        });

        res.json({ success: true, state: updatedState, topicsCreated: initialTopics.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
