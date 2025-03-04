export const assessmentDocs = {
    "/assessment/{courseModuleId}": {  
        post: {
            summary: "Create a new assessment",
            description: "Creates a new assessment for a specific course module.",
            tags: ["Assessments"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "courseModuleId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the course module where this assessment belongs",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string", description: "Title of the assessment" },
                                description: { type: "string", nullable: true, description: "Description of the assessment" },
                                type: { 
                                    type: "string",
                                    enum: ["QUIZ", "ASSIGNMENT", "CODING"],
                                    description: "Type of the assessment",
                                },
                            },
                            required: ["title", "type"], // Ensures required fields
                        },
                    },
                },
            },
            responses: {
                201: { description: "Assessment successfully created" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Only instructors can create assessments" },
                404: { description: "Course module not found" },
                500: { description: "Internal server error" },
            },
        },
    },
};
