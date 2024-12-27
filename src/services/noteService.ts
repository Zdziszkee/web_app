import * as noteRepository from '../repositories/noteRepository';
import { NoteModel } from '../models/noteModel';

export const getAllNotes = async (): Promise<NoteModel[]> => {
    return await noteRepository.getAllNotes();
};

export const getNoteById = async (noteId: number): Promise<NoteModel | undefined> => {
    return await noteRepository.getNoteById(noteId);
};

export const createNote = async (note: Omit<NoteModel, 'noteId'>): Promise<NoteModel> => {
    return await noteRepository.createNote(note);
};

export const updateNote = async (noteId: number, note: Partial<NoteModel>): Promise<void> => {
    await noteRepository.updateNote(noteId, note);
};

export const deleteNote = async (noteId: number): Promise<void> => {
    await noteRepository.deleteNote(noteId);
};