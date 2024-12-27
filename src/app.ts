import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {loginUserController, registerUserController} from "./controllers/userController";
import {authenticateJWT} from "./middlewares/authMiddleware";
import {registerMiddleware} from "./middlewares/registerMiddleware";
import cookieParser from "cookie-parser";
import noteRoutes from "./routes/noteRoutes"; // Import cookie-parser

const app = express();

// Set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/scripts", express.static(path.join(__dirname, "../dist/scripts")));
app.use(cookieParser()); // Use cookie-parser middleware

// Routes
app.get("/login", (req, res) => res.render("loginView"));
app.get("/register", (req, res) => res.render("registerView"));
app.get("/", authenticateJWT, (req, res) => res.render("mainView"));
app.post("/register", registerUserController);
app.post("/login", loginUserController);
app.use('/api', noteRoutes);

export default app;
