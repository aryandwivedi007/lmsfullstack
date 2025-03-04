import { AppDataSource } from "../common/services/database.service";
import { AssessmentSubmission } from "./assessment-submission.schema";

export const AssessmentSubmissionRepository=AppDataSource.getRepository(AssessmentSubmission)
