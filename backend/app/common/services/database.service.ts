import { DataSource } from 'typeorm';
import { User } from '../../user/user.schema';
import { Course } from '../../course/course.schema';
import { CourseModule } from '../../coursemodule/course-module.schema';
import { Assessment } from '../../assessment/assessment.schema';
import { AssessmentSubmission } from '../../assessment-submission/assessment-submission.schema';

export const AppDataSource = new DataSource({
  type: 'mysql',  
  driver: require('mysql2'), 
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mysqlroot',
  database: 'lms',
  entities: [User,Course,CourseModule,Assessment,AssessmentSubmission],
  synchronize: true,
  logging: false,
  extra: {
    authPlugin: 'caching_sha2_password',  // Ensure correct authentication plugin is used
  },
});

AppDataSource.initialize()
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.error('Database Connection Error:', err));
