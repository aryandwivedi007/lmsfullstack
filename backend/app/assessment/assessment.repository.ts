import { AppDataSource } from "../common/services/database.service";
import { Assessment } from "./assessment.schema";

export const AssessmentRepository=AppDataSource.getRepository(Assessment)