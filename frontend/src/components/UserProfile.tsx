import { Avatar, Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { CourseCard } from "./CourseCard"; // Import your existing CourseCard component




type Props = {
  data: meData;
};

function UserProfile({ data }: Props) {
  const { name, email, role, createdCourses, enrolledCourses } = data;

  return (
    <Box sx={{ px: 3, py: 5 }}>
      {/* User Info Card */}
      <Card sx={{ maxWidth: 400, mx: "auto", mb: 5 }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Avatar alt={name} sizes="large" sx={{ width: 100, height: 100 }}>
              {name.charAt(0)}
            </Avatar>
            <Box ml={3}>
              <Typography variant="h5" fontWeight="bold">
                {name}{" "}
                <Typography textTransform="lowercase" variant="subtitle1" component="span">
                  ({role})
                </Typography>
              </Typography>
              <Typography>{email}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Render Created Courses */}
      {createdCourses.length > 0 && (
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Created Courses
          </Typography>
          <Grid container spacing={3}>
            {createdCourses.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={4}>
                <CourseCard
                 showEnrollButton={false}
                  course={{
                    title: course.title,
                    instructor: name, // Since the instructor is the user itself
                    description: course.description,
                    rating: 4.5, // Dummy rating for now
                    price: course.price || 0, // Default price to 0 if not available
                    
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Render Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <Box mt={5}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Enrolled Courses
          </Typography>
          <Grid container spacing={3}>
            {enrolledCourses.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={4}>
                <CourseCard
                 showEnrollButton={false}
                  course={{
                    _id:course._id,
                    title: course.title,
                    instructor: "Unknown Instructor", // You may modify this if instructor info is available
                    description: course.description,
                    rating: 4.5, // Dummy rating for now
                    price: course.price || 0, // Default price to 0 if not available
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default UserProfile;
