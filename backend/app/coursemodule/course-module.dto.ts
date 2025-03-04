import { BaseSchema } from "../common/dto/base.dto";


export interface ICourseModule extends BaseSchema {
    title: string;
    contentType: "TEXT" | "VIDEO" | "PDF" | "LINK";
    content?: string;
    courseId: string; // Reference to the course it belongs to
}



export interface ICreateCourseModule extends BaseSchema {
    title: string;
    contentType: "TEXT" | "VIDEO" | "PDF" | "LINK";
    content?: string;
}
