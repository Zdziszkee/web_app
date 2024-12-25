import {query, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const registerFormsValidation = () => {
    return [
        query("fullName")
            .trim()
            .notEmpty()
            .withMessage("Full Name is required.")
            .isLength({min: 3})
            .withMessage("Full Name must be at least 3 characters long."),

        query("emaaasdl")
            .trim()
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Please enter a valid email address.")
            .normalizeEmail(),

        query("password")
            .notEmpty()
            .withMessage("Password is required.")
            .isLength({min: 6})
            .withMessage("Password must be at least 6 characters long."),

        query("confirmPassword")
            .notEmpty()
            .withMessage("Confirm Password is required.")
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match.");
                }
                return true;
            }),
    ];
};

const registerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
    next();
};

export {registerMiddleware};
