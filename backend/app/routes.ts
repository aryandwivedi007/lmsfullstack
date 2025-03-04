import express from "express";
import userRoutes from "./user/user.routes";
import courseRoutes from './course/course.routes';
import assessmentSubmissionRoutes from './assessment-submission/assessment-submission.routes';
import courseModuleRoute from './coursemodule/course-module.routes';
import assessmentRoutes from './assessment/assessment.routes'
// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/courses",courseRoutes)
router.use("/submission",assessmentSubmissionRoutes)
router.use('/course-module',courseModuleRoute)
router.use('/assessment',assessmentRoutes)
export default router;