import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import config from "../config/config";

// Open a database connection
export const openDb = async (): Promise<
  Database<sqlite3.Database, sqlite3.Statement>
> => {
  return open({
    filename: config.dbFile,
    driver: sqlite3.Database,
  });
};
