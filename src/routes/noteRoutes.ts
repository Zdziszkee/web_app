import express from 'express';
import {addNote, deleteNote, getNotes, updateNote} from "../controllers/noteController";

const router = express.Router();

router.get('/notes', getNotes);
router.post('/notes', addNote);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;