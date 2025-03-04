import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Assessment } from '../assessment/assessment.schema';
import { User } from '../user/user.schema';

@Entity('assessment_submissions')
export class AssessmentSubmission {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @ManyToOne(() => Assessment, (assessment) => assessment.submissions, { onDelete: 'CASCADE' })
    assessment: Assessment; // Assessment this submission belongs to

    @ManyToOne(() => User, (user) => user.submissions, { nullable: false, onDelete: 'CASCADE' })
    learner: User; // Learner who submitted the assessment

    @Column({ type: 'text', nullable: true })
    answer: string; // Learner's answer or submission content

    @Column({ type: 'enum', enum: ['PENDING', 'GRADED'], default: 'PENDING' })
    status: 'PENDING' | 'GRADED'; // Grading status

    @Column({ type: 'float', nullable: true })
    score?: number; // Score assigned by the instructor

    @CreateDateColumn()
    submittedAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
