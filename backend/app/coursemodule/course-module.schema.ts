import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    OneToMany 
} from 'typeorm';
import { Course } from '../course/course.schema';
import { Assessment } from '../assessment/assessment.schema';

export enum ContentType {
    TEXT = "TEXT",
    VIDEO = "VIDEO",
    PDF = "PDF",
    LINK = "LINK"
}

@Entity('course_modules')
export class CourseModule {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ 
        type: 'enum', 
        enum: ContentType, 
        default: ContentType.TEXT 
    })
    contentType: ContentType;

    @Column({ type: 'text', nullable: true })
    content: string;

    @ManyToOne(() => Course, (course) => course.modules, { onDelete: 'CASCADE' })
    course: Course;

    @OneToMany(() => Assessment, (assessment) => assessment.coursemodule)
    assessments: Assessment[];
}
