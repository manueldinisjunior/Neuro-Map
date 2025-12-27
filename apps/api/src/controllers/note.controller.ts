import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

const NOTE_SCHEMA = z.object({
    topicName: z.string().min(1, 'topicName is required'),
    title: z.string().optional(),
    content: z.string().min(1, 'content is required'),
});

export const createNote = async (req: Request, res: Response) => {
    try {
        const parseResult = NOTE_SCHEMA.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({ errors: parseResult.error.format() });
        }

        const { topicName, title, content } = parseResult.data;
        const userEmail = 'demo@local.dev';

        // Ensure user exists (placeholder for auth)
        const user = await prisma.user.upsert({
            where: { email: userEmail },
            update: {},
            create: { email: userEmail, name: 'Demo User' },
        });

        const topic = await prisma.topic.upsert({
            where: { userId_name: { userId: user.id, name: topicName } },
            update: {},
            create: { name: topicName, userId: user.id },
        });

        const wordsCount = content.trim().split(/\s+/).filter(Boolean).length;

        const note = await prisma.note.create({
            data: {
                userId: user.id,
                topicId: topic.id,
                title,
                content,
                wordsCount,
            },
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getRecentNotes = async (req: Request, res: Response) => {
    try {
        const userEmail = 'demo@local.dev';
        const user = await prisma.user.findUnique({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const notes = await prisma.note.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });

        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
