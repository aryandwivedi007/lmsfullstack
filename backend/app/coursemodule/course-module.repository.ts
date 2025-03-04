import { AppDataSource } from "../common/services/database.service";
import { CourseModule } from "./course-module.schema";

export const CourseModuleRepository= AppDataSource.getRepository(CourseModule)