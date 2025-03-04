export const courseModuleDocs = {
    "/course-module/{courseId}": {
        post: {
            summary: "Create a new course module",
            description: "Creates a new module for a specific course.",
            tags: ["Course Modules"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "courseId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the course to which this module belongs",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string" },
                                contentType: { 
                                    type: "string",
                                    enum: ["TEXT", "VIDEO", "PDF", "LINK"],
                                },
                                content: { type: "string", nullable: true },
                            },
                        },
                    },
                },
            },
            responses: {
                201: { description: "Course module successfully created" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Only instructors can create course modules" },
                404: { description: "Course not found" },
                500: { description: "Internal server error" },
            },
        },
    },

    "/course-module/{moduleId}": {
        get: {
            summary: "Get course module by ID",
            description: "Retrieves a specific course module.",
            tags: ["Course Modules"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "moduleId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "Module ID",
                },
            ],
            responses: {
                200: { description: "Module details retrieved successfully" },
                401: { description: "Unauthorized" },
                404: { description: "Module not found" },
                500: { description: "Internal server error" },
            },
        },

        put: {
            summary: "Update a course module",
            description: "Updates details of a course module.",
            tags: ["Course Modules"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "moduleId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "Module ID",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                title: { type: "string", nullable: true },
                                contentType: { 
                                    type: "string",
                                    enum: ["TEXT", "VIDEO", "PDF", "LINK"],
                                    nullable: true,
                                },
                                content: { type: "string", nullable: true },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Module successfully updated" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Only the course instructor can update this module" },
                404: { description: "Module not found" },
                500: { description: "Internal server error" },
            },
        },

        delete: {
            summary: "Delete a course module",
            description: "Removes a course module.",
            tags: ["Course Modules"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "moduleId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "Module ID",
                },
            ],
            responses: {
                200: { description: "Module successfully deleted" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Only the course instructor can delete this module" },
                404: { description: "Module not found" },
                500: { description: "Internal server error" },
            },
        },
    },
};
