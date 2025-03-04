import { Router } from "express";
import * as assessmentSubmissionController from './assessment-submission.controller';
import * as assessmentSubmissionValidation from './assessment-submission.validation'
import { roleAuth } from "../common/middleware/role-auth.middleware";
const router=Router()

router
    .post('/:accessmentSubmissionId',roleAuth(['USER']),assessmentSubmissionValidation.createAssessmentSubmission,assessmentSubmissionController.createAssessmentSubmission)
    .put('/:assessmentSubmissionId',roleAuth(['INSTRUCTOR']),assessmentSubmissionValidation.updateAssessmentSubmission,assessmentSubmissionController.updateAssessmentSubmission)


export default router