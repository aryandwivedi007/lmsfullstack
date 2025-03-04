import * as courseService from './course.service'
import asyncHandler from 'express-async-handler'
import { Request,Response } from 'express'
import { createResponse } from '../common/helper/response.helper'
import { User } from '../user/user.schema'

export const createCourse=asyncHandler(async(req:Request,res:Response)=>{
    const user=req.user as User
    const result=await courseService.createCourse(user,req.body)
    res.send(createResponse(result,"Course Created Successfully"))
})


export const updateCourse=asyncHandler(async(req:Request,res:Response)=>{
    const user=req.user as User
    const result=await courseService.updateCourse(req.params.id,req.body,user)
    res.send(createResponse(result,"Course updated successfully"))
})

export const getCourseById=asyncHandler(async(req:Request,res:Response)=>{
    const result=await courseService.getCourseById(req.params.id)
    res.send(createResponse(result,"Course fetched successfully"))
})

export const getAllCourse=asyncHandler(async(req:Request,res:Response)=>{
    const result=await courseService.getAllCourses()
    res.send(createResponse(result,"All Courses fetched successfully"))
})

export const enrollCourseToUser=asyncHandler(async(req:Request,res:Response)=>{
    const user=req.user as User
    const result=await courseService.enrollCourseToUser(user,req.params.courseId)
    res.send((createResponse(result,"User enrolled to course successfully")))
})
