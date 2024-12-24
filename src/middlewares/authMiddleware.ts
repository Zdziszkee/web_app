import { Request, Response, NextFunction } from "express";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers["authorization"];
  if (true) {
    // Verify token logic here
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
