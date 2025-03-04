import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BaseEntity,
  OneToMany,
  ManyToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import { IUser } from "./user.dto";
import { Course } from "../course/course.schema";
import { Assessment } from "../assessment/assessment.schema";
import { AssessmentSubmission } from "../assessment-submission/assessment-submission.schema";
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  INSTRUCTOR = "INSTRUCTOR",
}

@Entity("user")
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  _id: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @Column({ type: "enum", enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "text", nullable: true })
  refreshToken?: string | null;

  @CreateDateColumn({
    type: "timestamp",
    precision: 3,
    default: () => "CURRENT_TIMESTAMP(3)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    precision: 3,
    default: () => "CURRENT_TIMESTAMP(3)",
    onUpdate: "CURRENT_TIMESTAMP(3)",
  })
  updatedAt: Date;

  @OneToMany(() => Course, (course) => course.instructor)
  createdCourses: Course[]; // Courses created by instructor

  @ManyToMany(() => Course, (course) => course.students)
  enrolledCourses: Course[]; // Courses user is enrolled in

  @OneToMany(() => Assessment, (assessment) => assessment.instructor)
    createdAssessments: Assessment[]; // Assessments created by instructors

    @OneToMany(() => AssessmentSubmission, (submission) => submission.learner)
    submissions: AssessmentSubmission[]; // Assessments submitted by learners

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
