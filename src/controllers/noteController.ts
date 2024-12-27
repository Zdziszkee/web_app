import { Request, Response } from 'express';
import * as noteService from '../services/noteService';
import { NoteModel } from '../models/noteModel';

export const getNotes = async (req: Request, res: Response): Promise<void> => {
    try {
        const notes: NoteModel[] = await noteService.getAllNotes();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error });
    }
};

export const getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const note = await noteService.getNoteById(Number(id));
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching note', error });
    }
};

export const addNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, name, content } = req.body;
        const newNote = await noteService.createNote({ userId, name, content });
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Error adding note', error });
    }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, content } = req.body;
        await noteService.updateNote(Number(id), { name, content });
        res.json({ message: 'Note updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error });
    }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await noteService.deleteNote(Number(id));
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error });
    }
};