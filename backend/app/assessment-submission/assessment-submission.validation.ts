import { body, checkExact } from 'express-validator';

export const createAssessmentSubmission = checkExact([
    body('learnerId')
        .notEmpty().withMessage('Learner ID is required')
        .isUUID().withMessage('Learner ID must be a valid UUID'),

    body('answer')
        .notEmpty().withMessage('Answer is required')
        .isString().withMessage('Answer must be a string'),
]);
export const updateAssessmentSubmission = checkExact([
    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(["PENDING", "GRADED"]).withMessage('Status must be either PENDING or GRADED'),

    body('score')
        .notEmpty().withMessage('Score is required')
        .isNumeric().withMessage('Score must be a number'),
]);
