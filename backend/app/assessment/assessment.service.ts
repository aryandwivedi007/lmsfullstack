import { CourseModuleRepository } from "../coursemodule/course-module.repository";
import { UserRepository } from "../user/user.repository";
import { User } from "../user/user.schema";
import { ICreateAssessment } from "./assessment.dto";
import { AssessmentRepository } from "./assessment.repository"; 

// export const createAssessment = async (courseModuleId: string, data: ICreateAssessment, user: User) => {
    
//     console.log(courseModuleId)
//     const courseModule = await CourseModuleRepository.findOne({ where: { _id: courseModuleId }, relations: ["course"] });

//     if (!courseModule) {
//         throw new Error("Course module not found with the given ID");
//     }

    
//     if (courseModule.course.instructor._id !== user._id) {
//         throw new Error("Unauthorized: You are not the instructor of this course module");
//     }

//     const assessment = AssessmentRepository.create({
//         title: data.title,
//         description: data.description,
//         type: data.type as 'QUIZ' | 'ASSIGNMENT' | 'CODING', 
//         instructor: user, 
//         coursemodule: courseModule, 
//     });

//     await AssessmentRepository.save(assessment);

//     return assessment;
// };
export const createAssessment = async (courseModuleId: string, data: ICreateAssessment, user: User) => {
    console.log(courseModuleId);

    const courseModule = await CourseModuleRepository.findOne({
        where: { _id: courseModuleId },
        relations: { course: { instructor: true } }, // ✅ Explicitly join instructor
        select: { 
            _id: true, 
            course: { 
                _id: true, 
                instructor: { _id: true } // ✅ Make sure instructor is fetched
            } 
        }
    });
    
    

    if (!courseModule) {
        throw new Error("Course module not found with the given ID");
    }

    if (!courseModule.course || !courseModule.course.instructor) {
        throw new Error("Course or instructor not found for this module");
    }

    if (courseModule.course.instructor._id !== user._id) {
        throw new Error("Unauthorized: You are not the instructor of this course module");
    }

    const assessment = AssessmentRepository.create({
        title: data.title,
        description: data.description,
        type: data.type as 'QUIZ' | 'ASSIGNMENT' | 'CODING', 
        instructor: user, 
        coursemodule: courseModule, 
    });

    await AssessmentRepository.save(assessment);

    return assessment;
};
