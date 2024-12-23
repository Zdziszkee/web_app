"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kysely_1 = require("kysely");
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const config_1 = __importDefault(require("../config/config"));
const database = new kysely_1.Kysely({
    dialect: new kysely_1.SqliteDialect({
        database: new better_sqlite3_1.default(config_1.default.dbFile),
    }),
});
exports.default = database;
