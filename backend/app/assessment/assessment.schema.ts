import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Course } from '../course/course.schema';
import { User } from '../user/user.schema';
import { AssessmentSubmission } from '../assessment-submission/assessment-submission.schema';
import { CourseModule } from '../coursemodule/course-module.schema';

@Entity('assessments')
export class Assessment {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'enum', enum: ['QUIZ', 'ASSIGNMENT', 'CODING'], default: 'QUIZ' })
    type: 'QUIZ' | 'ASSIGNMENT' | 'CODING'; // Defines assessment type


    @ManyToOne(() => CourseModule, (coursemodule) => coursemodule.assessments, { onDelete: 'CASCADE' })
    coursemodule: CourseModule; // Belongs to a course module

    @ManyToOne(() => User, (user) => user.createdAssessments, { nullable: false, onDelete: 'CASCADE' })
    instructor: User; // Instructor who created the assessment

    @OneToMany(() => AssessmentSubmission, (submission) => submission.assessment)
    submissions: AssessmentSubmission[]; // Submissions for this assessment

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
