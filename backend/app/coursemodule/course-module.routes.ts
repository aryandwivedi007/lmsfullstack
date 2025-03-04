import { Router } from "express";

import * as courseModuleController from './course-module.controller';
import * as courseModuleValidation from './course-module.validation'
import { roleAuth } from "../common/middleware/role-auth.middleware";
const router =Router()


router
    .post('/:courseId',roleAuth(['INSTRUCTOR']),courseModuleValidation.createCourseModule,courseModuleController.createCourseModule)



export default router