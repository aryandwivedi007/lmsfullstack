import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from '../user/user.schema';
import { CourseModule } from '../coursemodule/course-module.schema';
import { Assessment } from '../assessment/assessment.schema';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column()
    category:'WEB DEVELOPMENT' | 'DATA-SCIENCE' | 'AI' | 'COMMUNICATION' | 'SCIENCE';

    @ManyToOne(() => User, (user) => user.createdCourses, { nullable: false, onDelete: 'CASCADE' })
    instructor: User; // Course is created by an instructor

    @ManyToMany(() => User, (user) => user.enrolledCourses)
    @JoinTable()
    students: User[]; // Students enrolled in this course

    @OneToMany(() => CourseModule, (module) => module.course)
    modules: CourseModule[]; // Modules within the course

    

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
