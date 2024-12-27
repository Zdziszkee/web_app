import { Generated, Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import config from "../config/config";

export interface DatabaseSchema {
    users: UserTable;
    notes: NoteTable;
}

export interface UserTable {
    userId: Generated<number>;
    name: string;
    email: string;
    hashedPassword: string;
}

export interface NoteTable {
    noteId: Generated<number>;
    userId: number;
    name: string;
    content: string;
}

const database = new Kysely<DatabaseSchema>({
    dialect: new SqliteDialect({
        database: new Database(config.dbFile),
    }),
});

// Function to create the users table if it doesn't exist
const createUsersTable = async () => {
    const schema = database.schema;

    await schema
        .createTable("users")
        .addColumn("userId", "integer", (col) => col.primaryKey().autoIncrement())
        .addColumn("name", "text", (col) => col.notNull())
        .addColumn("email", "text", (col) => col.notNull().unique())
        .addColumn("hashedPassword", "text", (col) => col.notNull())
        .ifNotExists()
        .execute();
};

// Function to create the notes table if it doesn't exist
const createNotesTable = async () => {
    const schema = database.schema;

    await schema
        .createTable("notes")
        .addColumn("noteId", "integer", (col) => col.primaryKey().autoIncrement())
        .addColumn("userId", "integer", (col) => col.notNull().references("users.userId"))
        .addColumn("name", "text", (col) => col.notNull())
        .addColumn("content", "text", (col) => col.notNull())
        .ifNotExists()
        .execute();
};

// Call the functions to create the tables
createUsersTable().catch((err) => {
    console.error("Failed to create users table:", err);
});

createNotesTable().catch((err) => {
    console.error("Failed to create notes table:", err);
});

export default database;