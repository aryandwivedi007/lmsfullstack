import { body, checkExact } from 'express-validator';

export const createAssessment = checkExact([
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),

    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),


    body('type')
        .notEmpty().withMessage('Type is required')
        .isIn(["QUIZ", "ASSIGNMENT", "CODING"]).withMessage('Type must be one of QUIZ, ASSIGNMENT, or CODING'),
]);
