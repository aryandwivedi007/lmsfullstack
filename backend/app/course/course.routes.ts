import * as courseController from './course.controller'
import { Router } from "express";
import * as courseValidator from './course.validation'
import { roleAuth } from '../common/middleware/role-auth.middleware';
const router =Router()

router
    .post('/',roleAuth(['INSTRUCTOR']),courseValidator.createCourse,courseController.createCourse)
    .get('/',roleAuth(['INSTRUCTOR','ADMIN','USER']),courseController.getAllCourse)
    .get('/:id',roleAuth(['ADMIN','INSTRUCTOR','USER']),courseController.getCourseById)
    .put('/:id',roleAuth(['INSTRUCTOR']),courseValidator.updateCourse,courseController.updateCourse)
    .patch('/:courseId',roleAuth(['INSTRUCTOR','ADMIN','USER']),courseController.enrollCourseToUser)


export default router