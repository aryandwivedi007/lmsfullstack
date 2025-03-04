import { BaseSchema } from "../common/dto/base.dto";

export interface ICourse extends BaseSchema {
    title: string;
    description?: string;
    instructorId: string; // Reference to the instructor
    studentIds?: string[]; // List of enrolled student IDs
    moduleIds?: string[]; // List of course module IDs
}

export interface ICreateCourse{
    title:string;
    description:string;
     category:'WEB DEVELOPMENT' | 'DATA-SCIENCE' | 'AI' | 'COMMUNICATION' | 'SCIENCE';
    price:Number;
}

export interface IUpdateCourse{
    title:string;
    description:string;
    instructorId:string;
}