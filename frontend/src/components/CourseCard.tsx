

// import React from "react";
// import { Card, CardContent, Typography, Button, Box, Rating } from "@mui/material";
// import { useEnrollCourseMutation } from "../services/api";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface Course {
//   _id: string;
//   title: string;
//   instructor: string;
//   description: string;
//   rating: number;
//   price: number;
// }

// interface CourseCardProps {
//   course: Course;
//   showEnrollButton?: boolean; // Optional prop
// }

// export const CourseCard: React.FC<CourseCardProps> = ({ course, showEnrollButton = true }) => {
//   const [enrollCourse, { isLoading }] = useEnrollCourseMutation();

//   const handleEnroll = async () => {
//     try {
//       await enrollCourse({ courseId: course._id }).unwrap();
//       toast.success("Successfully enrolled in the course!");
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Enrollment failed!");
//     }
//   };

//   return (
//     <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, p: 2 }}>
//       <CardContent>
//         <Typography variant="h6" fontWeight="bold" gutterBottom>
//           {course.title}
//         </Typography>
//         <Typography variant="subtitle2" color="textSecondary">
//           Instructor: {course.instructor}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 1 }}>
//           {course.description}
//         </Typography>
//         <Box display="flex" alignItems="center" gap={1} mb={1}>
//           <Rating value={course.rating} precision={0.5} readOnly />
//           <Typography variant="body2" fontWeight="bold">
//             {course.rating}
//           </Typography>
//         </Box>
//         <Typography variant="h6" color="primary" fontWeight="bold">
//           ₹{course.price}
//         </Typography>

//         {/* Conditionally render Enroll Now button */}
//         {showEnrollButton && (
//           <Button
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2 }}
//             onClick={handleEnroll}
//             disabled={isLoading}
//           >
//             {isLoading ? "Enrolling..." : "Enroll Now"}
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   );
// };
import React from "react";
import { Card, CardContent, Typography, Button, Box, Rating } from "@mui/material";
import { useEnrollCourseMutation, useMeQuery } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

interface Course {
  _id: string;
  title: string;
  instructor: string;
  description: string;
  rating: number;
  price: number;
}

interface CourseCardProps {
  course: Course;
  showEnrollButton?: boolean; // Optional prop
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, showEnrollButton = true }) => {
  const [enrollCourse, { isLoading }] = useEnrollCourseMutation();
  const { data: userData } = useMeQuery();
  const navigate = useNavigate();

  const handleClick = () => {
    if (userData?.data?.role === "INSTRUCTOR") {
      navigate(`/add-module/${course._id}`); 
    }
  };

  const handleEnroll = async () => {
    try {
      await enrollCourse({ courseId: course._id }).unwrap();
      toast.success("Successfully enrolled in the course!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Enrollment failed!");
    }
  };

  return (
    <Card
      sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, p: 2, cursor: "pointer" }}
      onClick={handleClick} // Handle instructor click navigation
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Instructor: {course.instructor}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 1 }}>
          {course.description}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Rating value={course.rating} precision={0.5} readOnly />
          <Typography variant="body2" fontWeight="bold">
            {course.rating}
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{course.price}
        </Typography>

        {/* Conditionally render Enroll Now button only for non-instructors */}
        {showEnrollButton && userData?.data?.role !== "INSTRUCTOR" && (
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              handleEnroll();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Enrolling..." : "Enroll Now"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
