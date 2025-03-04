

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";
import { setTokens, resetTokens } from "../store/reducer/AuthReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token expired, attempt to refresh
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/users/refreshToken",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Save new tokens
        const { accessToken, refreshToken } = refreshResult.data as { accessToken: string; refreshToken: string };
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        api.dispatch(setTokens({ accessToken, refreshToken }));

        // Retry original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(resetTokens());
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    me: builder.query<ApiResponse<User>, void>({
      query: () => "/users/me",
    }),
    login: builder.mutation<ApiResponse<{ accessToken: string; refreshToken: string }>, { email: string; password: string }>({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<ApiResponse<User>, Omit<User, "_id" | "active" | "role"> & { confirmPassword: string }>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<ApiResponse<User>, User>({
      query: (body) => ({
        url: `/users/${body._id}`,
        method: "PUT",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation<{ accessToken: string; refreshToken: string }, { refreshToken: string }>({
      query: (body) => ({
        url: "/users/refresh-token",
        method: "POST",
        body,
      }),
    }),
    getAllCourses: builder.query<ApiResponse<Course[]>, void>({
      query: () => "/courses/",
    }),
    createCourse: builder.mutation<
      ApiResponse<Course>,
      { title: string; description: string; category: string; price: number }
    >({
      query: (body) => ({
        url: "/courses",
        method: "POST",
        body,
      }),
    }),
    createCourseModule: builder.mutation<CourseModule, { courseId: string; data: CourseModule }>({
      query: ({ courseId, data }) => ({
        url: `/course-module/${courseId}`,
        method: "POST",
        body: data,
      }),
    }),
    getCourseById: builder.query<ApiResponse<CourseDetails>, { courseId: string }>({
      query: ({ courseId }) => `/courses/${courseId}`,
    }),
    enrollCourse: builder.mutation<ApiResponse<{ message: string }>, { courseId: string }>({
      query: ({ courseId }) => ({
        url: `/courses/${courseId}`,
        method: "PATCH",
      }),
    }),
  }),
  
});

export const { useMeQuery,
   useLoginMutation,
    useLogoutMutation,
     useRegisterMutation, 
     useUpdateUserMutation,
      useRefreshTokenMutation,
      useGetAllCoursesQuery,
      useEnrollCourseMutation,
      useCreateCourseMutation,
      useGetCourseByIdQuery
     } = api;