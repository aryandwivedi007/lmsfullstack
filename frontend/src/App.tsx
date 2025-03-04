import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import AuthanticatedLayout from "./layouts/Authenticated";
import BasicLayout from "./layouts/Basic";
import CreateCoursePage from "./pages/createcoursepage";
import AddModulePage from "./pages/AddModulePage";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/homepage"));
const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/profile"));
const Register = lazy(() => import("./pages/register"));
const CoursePage = lazy(() => import("./pages/coursepage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AuthanticatedLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/all-courses" element={<CoursePage />} />
          <Route path="/create-course" element={<CreateCoursePage />} />
          <Route path="/add-module/:courseId" element={<AddModulePage />} />

        </Route>
        <Route element={<BasicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
