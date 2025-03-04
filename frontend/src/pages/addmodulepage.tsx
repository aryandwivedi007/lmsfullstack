import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../services/api";
import ModuleList from "../components/ModuleList";

const AddModulePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, isLoading } = useGetCourseByIdQuery(courseId);

  if (isLoading) return <Typography>Loading course details...</Typography>;
  if (!data?.data) return <Typography>Course not found!</Typography>;

  const { title, description, modules } = data.data;

  return (
    <Box display="flex" gap={4} p={3}>
      {/* Left Sidebar */}
      <Box width="250px">
        <Button variant="contained" color="primary" fullWidth>
          Add Module
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex={1}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </Card>

        {/* Module List */}
        <ModuleList modules={modules} />
      </Box>
    </Box>
  );
};

export default AddModulePage;
