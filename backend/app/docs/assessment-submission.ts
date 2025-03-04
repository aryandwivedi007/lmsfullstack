export const assessmentSubmissionDocs = {
    "/submission/{assessmentId}": {  // ✅ Accepts assessmentId as a path parameter
        post: {
            summary: "Submit an assessment",
            description: "Allows a learner to submit their answer for an assessment.",
            tags: ["Assessment Submissions"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "assessmentId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the assessment being submitted",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                answer: { type: "string", nullable: true }, // Learner's response
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: "Assessment successfully submitted" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Only learners can submit assessments" },
                404: { description: "Assessment not found" },
                500: { description: "Internal server error" },
            },
        },
    },

    "/submission/{assessmentSubmissionId}": {
        get: {
            summary: "Get an assessment submission",
            description: "Retrieves details of a specific assessment submission.",
            tags: ["Assessment Submissions"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "assessmentSubmissionId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the assessment submission",
                },
            ],
            responses: {
                200: { description: "Assessment submission details retrieved successfully" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Only instructors or the submitting learner can view" },
                404: { description: "Assessment submission not found" },
                500: { description: "Internal server error" },
            },
        },
        
        put: {
            summary: "Grade an assessment submission",
            description: "Allows an instructor to update (grade) an assessment submission.",
            tags: ["Assessment Submissions"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "assessmentSubmissionId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the assessment submission",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: { 
                                    type: "string",
                                    enum: ["PENDING", "GRADED"],
                                },
                                score: { type: "number", nullable: true }, // Score assigned by the instructor
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Assessment submission successfully updated" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Only instructors can grade submissions" },
                404: { description: "Assessment submission not found" },
                500: { description: "Internal server error" },
            },
        },
    },
};
