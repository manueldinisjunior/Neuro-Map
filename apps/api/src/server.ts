import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const NOTE_SCHEMA = z.object({
  topicName: z.string().min(1, 'topicName is required'),
  title: z.string().optional(),
  content: z.string().min(1, 'content is required'),
});

const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));

async function ensureDemoUser() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@local.dev' },
    update: {},
    create: {
      email: 'demo@local.dev',
      name: 'Demo User',
    },
  });
  return user;
}

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.get('/topics', async (_req: Request, res: Response) => {
  const user = await ensureDemoUser();
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
});

app.post('/notes', async (req: Request, res: Response) => {
  const parseResult = NOTE_SCHEMA.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.format() });
  }

  const { topicName, title, content } = parseResult.data;
  const user = await ensureDemoUser();

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
});

app.get('/map', async (_req: Request, res: Response) => {
  const user = await ensureDemoUser();
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
    const radius = clamp(12, 60, 12 + score * 2);

    return {
      id: topic.id,
      label: topic.name,
      score,
      radius,
    };
  });

  res.json({ nodes, edges: [] });
});

app.get('/notes', async (_req: Request, res: Response) => {
  const user = await ensureDemoUser();
  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  res.json(notes);
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
