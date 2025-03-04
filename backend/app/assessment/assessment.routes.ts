import { Router } from "express";
import * as assessmentController from './assessment.controller';
import * as assessmentValidation from './assessment.validation'
import { roleAuth } from "../common/middleware/role-auth.middleware";
const router=Router()

router
    .post('/:courseModuleId',roleAuth(['INSTRUCTOR']),assessmentValidation.createAssessment,assessmentController.createAssessment)



export default router