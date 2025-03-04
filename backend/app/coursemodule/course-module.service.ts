import { ICourseModule } from "./course-module.dto";
import { CourseModuleRepository } from "./course-module.repository";
import { CourseRepository } from "../course/course.repository";
import { ContentType } from "./course-module.schema";
import { AssessmentRepository } from "../assessment/assessment.repository";

export const createCourseModule=async(courseId:string,data:ICourseModule)=>{
    const course=await CourseRepository.findOne({where:{_id:courseId}})
    if(!course){
        throw new Error("Course does not exist with this id")
    }
    const newCourseModule = CourseModuleRepository.create({ 
        title: data.title,
        contentType: data.contentType as ContentType,
        content: data.content,
        course 
    });
    await CourseModuleRepository.save(newCourseModule); 

    return newCourseModule;
}

export const getAssessmentForCourseModule=async(couresModuleId:string)=>{
    const assessments=await AssessmentRepository.find({where:{_id:couresModuleId}})
    return assessments
}


