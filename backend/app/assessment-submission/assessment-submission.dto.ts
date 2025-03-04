export interface ICreateAssessmentSubmission{
    learnerId:string;
    answer:string;
}

export interface IUpdateAssessmentSubmission{
    status:"PENDING" | "GRADED";
    score:Number;
}