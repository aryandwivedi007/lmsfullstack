import { User } from "../user/user.schema";
import { ICourse, ICreateCourse, IUpdateCourse } from "./course.dto";
import { CourseRepository } from "./course.repository";

export const createCourse=async(user:User,data:ICreateCourse)=>{
    const newCourse = CourseRepository.create({ ...data, instructor: user });
    await CourseRepository.save(newCourse)
    return newCourse
}

export const updateCourse=async(id:string,data:IUpdateCourse,user:User)=>{
    const course = await CourseRepository.findOne({
        where: { _id: id },
        relations: ["instructor"], // Load instructor details
        select: {
            instructor: {
                _id: true,
                name: true,
                email: true,
                role: true, // Only include necessary fields
            }
        }
    });
    
    if(user._id!=course?.instructor._id){
        throw new Error("Unauthorized: You can only update your own courses");
    }
    if (!course) throw new Error("Course not found");
    Object.assign(course,data)
    await CourseRepository.save(course)
    return course
}

export const getCourseById=async(id:string)=>{
    const course=await CourseRepository.findOne({where:{_id:id},relations:["modules","instructor"],select: {
        instructor: { name: true } // Select only instructor's name
    }})
    return course
}

export const getAllCourses = async () => {
    return CourseRepository.find({
        relations: ["instructor"], 
        select: {
            instructor: { name: true } 
        }
    });
};

export const enrollCourseToUser = async (user: User, courseId: string) => {
    console.log(courseId)
    const course = await CourseRepository.findOne({
        where: { _id: courseId },
        relations: ["students"], 
    });

    if (!course) {
        throw new Error("Course not found");
    }

    if (!course.students) {
        course.students = []; 
    }

    if (course.students.some((enrolledUser) => enrolledUser._id === user._id)) {
        throw new Error("User is already enrolled in this course");
    }

    course.students.push(user); 
    await CourseRepository.save(course);

    return course;
};

