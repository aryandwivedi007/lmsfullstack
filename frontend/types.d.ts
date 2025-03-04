declare module "*.svg" {
    import React from "react";
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  
  interface User {
    _id: string;
    name: string;
    email: string;
    active: boolean;
    role: "USER" | "ADMIN" | "INSTRUCTOR";
  }

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface meData{
  user:User;
  createdCourses:Course[];
  enrolledCourses:Course[]
}

  interface ApiResponse<T> {
    data: T;
    message: string;
    sucess: boolean
  }