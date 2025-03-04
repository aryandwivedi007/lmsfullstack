import React from "react";
import { useGetAllCoursesQuery } from "../services/api";
import { Grid, Container, Typography, CircularProgress, Alert } from "@mui/material";
import { CourseCard } from "../components/CourseCard";


const CoursePage: React.FC = () => {
  const { data, error, isLoading } = useGetAllCoursesQuery();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Available Courses
      </Typography>

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Failed to load courses</Alert>}

      <Grid container spacing={3}>
        {data?.data.map((course) => (
          <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
            <CourseCard
              course={{
                _id:course._id,
                title: course.title,
                instructor: course.instructor.name, // Dummy instructor name
                description: course.description,
                rating: Math.floor(Math.random() * 5) + 1, // Random rating
                price: course.price || 0, // Default to 0 if price is missing
                showEnrollButton={true}
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoursePage;
