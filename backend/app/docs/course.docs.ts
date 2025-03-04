export const courseDocs = {
    "/courses/": {
        post: {
                summary: "Create a new course",
                description: "Creates a new course with the provided details.",
                tags: ["Courses"],
                security: [{ BearerAuth: [] }], // 🔥 Requires authentication
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" },
                                    category: { 
                                        type: "string",
                                        enum: ["WEB DEVELOPMENT", "DATA-SCIENCE", "AI", "COMMUNICATION", "SCIENCE"],
                                        description: "Category of the course",
                                    },
                                    price: { type: "number", description: "Price of the course" },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: { description: "Course successfully created" },
                    400: { description: "Validation error" },
                    401: { description: "Unauthorized" },
                    500: { description: "Internal server error" },
                },
            },

        get: {
            summary: "Get all courses",
            description: "Retrieves a list of all available courses.",
            tags: ["Courses"],
            responses: {
                200: { description: "Courses retrieved successfully" },
                500: { description: "Internal server error" },
            },
        },
    },

    "/courses/{id}": {
        get: {
            summary: "Get course by ID",
            description: "Fetches details of a specific course using its ID.",
            tags: ["Courses"],
            security: [{ BearerAuth: [] }], 
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "Course ID",
                },
            ],
            responses: {
                200: { description: "Course details retrieved successfully" },
                401: { description: "Unauthorized" },
                404: { description: "Course not found" },
                500: { description: "Internal server error" },
            },
        },

        "/courses/{courseId}": {
        patch: {
            summary: "Enroll a user in a course",
            description: "Allows a user to enroll in a specific course.",
            tags: ["Courses"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "courseId",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "ID of the course to enroll in",
                },
            ],
            responses: {
                200: { description: "User successfully enrolled in the course" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: You cannot enroll in this course" },
                404: { description: "Course not found" },
                500: { description: "Internal server error" },
            },
        },
    },

        put: {
            summary: "Update a course",
            description: "Updates a course's details by its ID.",
            tags: ["Courses"],
            security: [{ BearerAuth: [] }], // 🔥 Requires authentication
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                    description: "Course ID",
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
                                description: { type: "string", nullable: true },
                            },
                        },
                    },
                },
            },
            responses: {
                200: { description: "Course successfully updated" },
                400: { description: "Validation error" },
                401: { description: "Unauthorized" },
                403: { description: "Forbidden: Not allowed to update this course" },
                404: { description: "Course not found" },
                500: { description: "Internal server error" },
            },
        },
    },
};
