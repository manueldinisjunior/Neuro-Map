import { Router } from 'express';
import * as TopicController from '../controllers/topic.controller';

const router = Router();

router.get('/', TopicController.getTopics);
router.get('/map', TopicController.getMapData);

export default router;
