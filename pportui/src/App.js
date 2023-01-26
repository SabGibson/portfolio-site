import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPw";
import ResetPasswordConfirm from "./pages/ResetPwConfirm";
import ActivateEmail from "./pages/Activate";
import Profile from "./pages/Profile";
import SiteNav from "./components/siteNav";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import { projectsLoader } from "./pages/Home";
import { postsLoader } from "./pages/PostDetail";
import { postHistLoader } from "./pages/UpdatePost";
import Error from "./pages/Error";
import MakePost from "./pages/MakePost";
import MakeProject from "./pages/MakeProject";
import UpdatePost from "./pages/UpdatePost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SiteNav />}>
      <Route index loader={projectsLoader} element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<Register />} />
      <Route
        path="projects/:project_id/posts/"
        loader={postsLoader}
        element={<PostDetail />}
      />
      <Route path="projects/:project_id/posts/create/" element={<MakePost />} />
      <Route path="projects/create/" element={<MakeProject />} />
      <Route
        path="projects/:id/posts/:post_param_id/update"
        element={<UpdatePost />}
      />
      <Route path="profile/" element={<Profile />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route
        path="password/reset/confirm/:uid/:token"
        element={<ResetPasswordConfirm />}
      />
      <Route path="activate/" element={<ActivateEmail />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
