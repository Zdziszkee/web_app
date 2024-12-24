import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import config from "../config/config";

interface DatabaseSchema {
  users: {
    id: number;
    name: string;
    email: string;
    password: string;
  };
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
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.notNull().unique())
    .addColumn("password", "text", (col) => col.notNull())
    .ifNotExists()
    .execute();
};

// Call the function to create the table
createUsersTable().catch((err) => {
  console.error("Failed to create users table:", err);
});

export default database;
