import { ICreateAssessment } from "../assessment/assessment.dto"
import { AssessmentRepository } from "../assessment/assessment.repository"
import { User } from "../user/user.schema"
import { ICreateAssessmentSubmission, IUpdateAssessmentSubmission } from "./assessment-submission.dto"
import { AssessmentSubmissionRepository } from "./assessment-submission.repository"

export const createAssessmentSubmission=async(assessmentId:string,data:ICreateAssessmentSubmission,user:User)=>{
    const assessment=await AssessmentRepository.findOne({where:{_id:assessmentId}})
    if (!assessment) {
        throw new Error("Assessment not found with the given ID");
    }

   
    const assessmentSubmission = AssessmentSubmissionRepository.create({
        answer: data.answer,
        status: "PENDING",
        assessment, 
        learner: user, 
    });

   
    await AssessmentSubmissionRepository.save(assessmentSubmission);
    return assessmentSubmission
}

export const updateAssessmentSubmission = async (
    assessmentSubmissionId: string,
    data: IUpdateAssessmentSubmission,
    user: User
) => {
    const assessmentSubmission = await AssessmentSubmissionRepository.findOne({
        where: { _id: assessmentSubmissionId },
        relations: ["assessment", "assessment.instructor"], 
        select: {
            _id: true,
            assessment: { _id: true, instructor: { _id: true } },
            answer: true,
            status: true,
            score: true,
            submittedAt: true,
            updatedAt: true,
        },
    });

    if (!assessmentSubmission) {
        throw new Error("Assessment submission not found");
    }

    Object.assign(assessmentSubmission, data);
    
    await AssessmentSubmissionRepository.save(assessmentSubmission);

    return assessmentSubmission;
};
