import asyncHandler from 'express-async-handler'
import { Request,Response } from 'express'
import * as courseModuleService from './course-module.service'
import { createResponse } from '../common/helper/response.helper'

export const createCourseModule=asyncHandler(async(req:Request,res:Response)=>{
    const result=await courseModuleService.createCourseModule(req.params.courseId,req.body)
    res.send(createResponse(result,"Course Module is created successfully"))
})
