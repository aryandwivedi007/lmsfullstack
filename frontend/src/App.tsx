import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AuthanticatedLayout from "./layouts/Authenticated";
import BasicLayout from "./layouts/Basic";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/homepage"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const Register = lazy(() => import("./pages/register"));
const CoursePage = lazy(() => import("./pages/coursepage"));
const CreateCoursePage = lazy(() => import("./pages/createcoursepage"));
// const AddModulePage = lazy(() => import("./pages/AddModulePage"));

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary} style={{ padding: "8px 16px", cursor: "pointer" }}>
        Try Again
      </button>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AuthanticatedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/all-courses" element={<CoursePage />} />
            <Route path="/create-course" element={<CreateCoursePage />} />
            {/* <Route path="/add-module/:courseId" element={<AddModulePage />} /> */}
          </Route>

          <Route element={<BasicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
