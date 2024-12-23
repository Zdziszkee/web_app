import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import config from "./config/config";
import path from "path";

const app = express();

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRoutes);

export default app;
