import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import path from "path";

const app = express();

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", userRoutes);
app.get("/login", (req, res) => res.render("loginView"));
app.get("/register", (req, res) => res.render("registerView"));

export default app;
