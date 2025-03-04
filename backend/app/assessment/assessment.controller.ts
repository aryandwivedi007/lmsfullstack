import asyncHandler from 'express-async-handler'
import { Request,Response } from 'express'
import * as assessmentService from './assessment.service'
import { User } from '../user/user.schema'
import { createResponse } from '../common/helper/response.helper'

export const createAssessment=asyncHandler(async(req:Request,res:Response)=>{
    const user=req.user as User;
    const result=await assessmentService.createAssessment(req.params.courseModuleId,req.body,user);
    res.send(createResponse(result,"Assessment Created Successfully"))
})