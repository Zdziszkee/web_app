import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {registerUserController} from "./controllers/userController";

const app = express();

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/scripts", express.static(path.join(__dirname, "../dist/scripts")));
// Routes
app.get("/login", (req, res) => res.render("loginView"));
app.get("/register", (req, res) => res.render("registerView"));
app.post("/register", registerUserController);
export default app;
