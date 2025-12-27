import express from 'express';
import cors from 'cors';
import topicRoutes from './routes/topic.routes';
import noteRoutes from './routes/note.routes';
import onboardingRoutes from './routes/onboarding.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/topics', topicRoutes);
app.use('/notes', noteRoutes);
app.use('/onboarding', onboardingRoutes);

export default app;
