import { Request,Response } from "express";
import * as assessmentSubmissionService from './assessment-submission.service'
import asyncHandler from 'express-async-handler'
import { User } from "../user/user.schema";
import { createResponse } from "../common/helper/response.helper";

export const createAssessmentSubmission=asyncHandler(async(req:Request,res:Response)=>{
    const user=req.user as User;
    const result=await assessmentSubmissionService.createAssessmentSubmission(req.params.accessmentSubmissionId,req.body,user);
    res.send(createResponse(result,"Assessment Submission created successfully"));
})

export const updateAssessmentSubmission=asyncHandler(async(req:Request,res:Response)=>{
    const user=req.user as User;
    const result=await assessmentSubmissionService.updateAssessmentSubmission(req.params.assessmentSubmissionId,req.body,user);
    res.send(createResponse(result,"Assessment Submission updated successfully"))
})