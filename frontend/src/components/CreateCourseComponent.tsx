import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { createStyles } from "@mui/styles";
import { CSSProperties } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useCreateCourseMutation } from "../services/api";

// Validation Schema
const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup
    .string()
    .oneOf(["WEB DEVELOPMENT", "DATA-SCIENCE", "AI", "COMMUNICATION", "SCIENCE"])
    .required("Category is required"),
  price: yup.number().min(0, "Price must be positive").required("Price is required"),
});

const useStyle = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
      flex: 1,
      mx: "auto",
    },
    input: {
      mt: 2,
    },
    button: {
      my: 2,
    },
  });

type FormData = typeof validationSchema.__outputType;

export default function CreateCourseForm() {
  const theme = useTheme();
  const style = useStyle(theme);
  const [createCourse] = useCreateCourseMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      category: "WEB DEVELOPMENT",
      price: 0,
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createCourse(data).unwrap();
      toast.success("Course created successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong!");
    }
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card variant="outlined" sx={style.root}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Create Course
            </Typography>

            <TextField
              sx={style.input}
              fullWidth
              label="Title"
              {...register("title")}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />

            <TextField
              sx={style.input}
              fullWidth
              label="Description"
              multiline
              rows={3}
              {...register("description")}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
            />

            <TextField
              sx={style.input}
              fullWidth
              select
              label="Category"
              {...register("category")}
              error={Boolean(errors.category)}
              helperText={errors.category?.message}
            >
              {["WEB DEVELOPMENT", "DATA-SCIENCE", "AI", "COMMUNICATION", "SCIENCE"].map(
                (option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                )
              )}
            </TextField>

            <TextField
              sx={style.input}
              fullWidth
              label="Price"
              type="number"
              {...register("price")}
              error={Boolean(errors.price)}
              helperText={errors.price?.message}
            />

            <Button
              type="submit"
              sx={style.button}
              variant="contained"
              fullWidth
              disabled={!isValid}
            >
              Create Course
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
