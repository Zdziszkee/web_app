"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
        // Verify token logic here
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.default = authMiddleware;
