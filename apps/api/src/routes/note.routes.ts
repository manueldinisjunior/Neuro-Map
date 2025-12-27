import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = Router();

router.post('/', NoteController.createNote);
router.get('/', NoteController.getRecentNotes);

export default router;
