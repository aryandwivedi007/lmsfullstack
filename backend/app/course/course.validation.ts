import { body, checkExact } from 'express-validator';

export const createCourse = checkExact([
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string'),

    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string'),

    
]);

export const updateCourse = checkExact([
    body('title')
        .optional()
        .isString().withMessage('Title must be a string'),

    body('description')
        .optional()
        .isString().withMessage('Description must be a string'),

    body('instructorId')
        .optional()
        .isUUID().withMessage('Instructor ID must be a valid UUID'),
]);
