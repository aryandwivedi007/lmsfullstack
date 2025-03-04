import { body, checkExact } from 'express-validator';

export const createCourseModule = checkExact([
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),

    body('contentType')
        .notEmpty().withMessage('Content Type is required')
        .isIn(["TEXT", "VIDEO", "PDF", "LINK"]).withMessage('Content Type must be one of TEXT, VIDEO, PDF, or LINK'),

    body('content')
        .optional()
        .isString().withMessage('Content must be a string if provided'),
]);
