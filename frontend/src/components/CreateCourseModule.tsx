import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Card, CardContent, MenuItem, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { ContentType, useCreateCourseModuleMutation } from "../services/api";
import { useParams } from "react-router-dom";

interface CourseModuleFormData {
  title: string;
  contentType: ContentType;
  content?: string;
}

export default function CreateCourseModule() {
  const { courseId } = useParams<{ courseId: string }>(); // Get courseId from URL
  const [createCourseModule, { isLoading }] = useCreateCourseModuleMutation();
  const { register, handleSubmit, control, formState: { errors } } = useForm<CourseModuleFormData>();

  const onSubmit = async (data: CourseModuleFormData) => {
    if (!courseId) {
      toast.error("Course ID not found!");
      return;
    }
    try {
      await createCourseModule({ courseId, data }).unwrap();
      toast.success("Course Module Created Successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create course module");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Create Course Module
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Title"
              {...register("title", { required: "Title is required" })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              sx={{ my: 2 }}
            />

            <Controller
              name="contentType"
              control={control}
              defaultValue={ContentType.TEXT}
              rules={{ required: "Content type is required" }}
              render={({ field }) => (
                <TextField
                  select
                  fullWidth
                  label="Content Type"
                  {...field}
                  error={Boolean(errors.contentType)}
                  helperText={errors.contentType?.message}
                  sx={{ my: 2 }}
                >
                  {Object.values(ContentType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <TextField
              fullWidth
              label="Content (optional)"
              {...register("content")}
              sx={{ my: 2 }}
            />

            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Module"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
