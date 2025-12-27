import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getTopics = async (req: Request, res: Response) => {
    try {
        // For now using demo user, will use req.user.id after auth implementation
        const userEmail = 'demo@local.dev';
        const user = await prisma.user.findUnique({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const topics = await prisma.topic.findMany({
            where: { userId: user.id },
            include: {
                notes: { select: { wordsCount: true } },
                _count: { select: { notes: true } },
            },
            orderBy: { createdAt: 'asc' },
        });

        const result = topics.map((topic) => {
            const notesCount = topic._count.notes;
            const wordsSum = topic.notes.reduce((sum, note) => sum + (note.wordsCount ?? 0), 0);
            const score = notesCount + Math.floor(wordsSum / 50);
            return { ...topic, notesCount, wordsSum, score };
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getMapData = async (req: Request, res: Response) => {
    try {
        const userEmail = 'demo@local.dev';
        const user = await prisma.user.findUnique({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const topics = await prisma.topic.findMany({
            where: { userId: user.id },
            include: {
                notes: { select: { wordsCount: true } },
                _count: { select: { notes: true } },
            },
        });

        const nodes = topics.map((topic) => {
            const notesCount = topic._count.notes;
            const wordsSum = topic.notes.reduce((sum, note) => sum + (note.wordsCount ?? 0), 0);
            const score = notesCount + Math.floor(wordsSum / 50);
            const radius = Math.min(60, Math.max(12, 12 + score * 2));

            return {
                id: topic.id,
                label: topic.name,
                score,
                radius,
            };
        });

        res.json({ nodes, edges: [] });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
