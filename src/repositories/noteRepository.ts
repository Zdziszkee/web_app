import database from '../utils/database';
import { NoteModel } from '../models/noteModel';

export const getAllNotes = async (): Promise<NoteModel[]> => {
    return await database.selectFrom('notes').selectAll().execute();
};

export const getNoteById = async (noteId: number): Promise<NoteModel | undefined> => {
    return await database.selectFrom('notes').selectAll().where('noteId', '=', noteId).executeTakeFirst();
};

export const createNote = async (note: Omit<NoteModel, 'noteId'>): Promise<NoteModel> => {
    const [insertedNote] = await database.insertInto('notes').values(note).returningAll().execute();
    return insertedNote;
};

export const updateNote = async (noteId: number, note: Partial<NoteModel>): Promise<void> => {
    await database.updateTable('notes').set(note).where('noteId', '=', noteId).execute();
};

export const deleteNote = async (noteId: number): Promise<void> => {
    await database.deleteFrom('notes').where('noteId', '=', noteId).execute();
};