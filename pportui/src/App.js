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
import Activate from "./pages/Activate";
import Profile from "./pages/Profile";
import SiteNav from "./components/siteNav";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SiteNav />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="projects" element={<Home />} />
      <Route path="projects/:id" element={<ProjectsDetail />} />
      <Route path="profile" element={<Profile />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route
        path="password/reset/confirm/:uid/:token"
        element={<ResetPasswordConfirm />}
      />
      <Route path="activate/:uid/:token" element={<Activate />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
