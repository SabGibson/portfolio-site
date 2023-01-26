import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProjectsDetail from "./pages/ProjectsDetail";
import ResetPassword from "./pages/ResetPw";
import ResetPasswordConfirm from "./pages/ResetPwConfirm";
import ActivateEmail from "./pages/Activate";
import Profile from "./pages/Profile";
import SiteNav from "./components/siteNav";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import { projectsLoader } from "./pages/Home";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SiteNav />}>
      <Route index loader={projectsLoader} element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<Register />} />
      <Route path="projects" element={<Home />} />
      <Route path="projects/:id" element={<ProjectsDetail />} />
      <Route path="projects/:id/posts" element={<PostDetail />} />
      <Route path="profile" element={<Profile />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route
        path="password/reset/confirm/:uid/:token"
        element={<ResetPasswordConfirm />}
      />
      <Route path="activate/" element={<ActivateEmail />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
