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

export default database;
