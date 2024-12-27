import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.token; // Access the token from cookies
    console.log(token);
    if (!token) {
        // Respond with 401 Unauthorized and stop further execution
         res.status(401).json({ message: 'Unauthorized: Token not found' });
         return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        // Optionally, you can attach the decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Respond with 403 Forbidden and stop further execution
        console.log(err);
         res.status(403).json({ message: 'Forbidden: Invalid token' });
         return;
    }
};