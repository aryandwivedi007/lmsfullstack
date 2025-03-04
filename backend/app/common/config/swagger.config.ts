import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { userDocs } from '../../docs/user.docs';
import {courseDocs} from '../../docs/course.docs';
import {courseModuleDocs} from '../../docs/course-module';
import {assessmentDocs} from '../../docs/assessment'
import { assessmentSubmissionDocs } from '../../docs/assessment-submission';

const swaggerOptions: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your Node.js & TypeScript app',
    },
    paths: {
      ...userDocs,
      ...courseDocs,
      ...courseModuleDocs,
      ...assessmentDocs,
      ...assessmentSubmissionDocs
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // Change this based on your server URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./app/routes/*.ts'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log('Swagger Docs available at http://localhost:5000/api-docs');
};