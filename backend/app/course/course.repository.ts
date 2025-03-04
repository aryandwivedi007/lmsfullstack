import { AppDataSource } from '../common/services/database.service'
import { Course } from './course.schema';

export const CourseRepository = AppDataSource.getRepository(Course);