import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SiteNav from "./components/siteNav";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import { projectsLoader } from "./pages/Home";
import { postsByProjectLoader } from "./pages/PostDetail";
import MakePost from "./pages/MakePost";
import MakeProject from "./pages/MakeProject";
import UpdatePost from "./pages/UpdatePost";
import UpdateProject from "./pages/UpdateProject";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SiteNav />}>
      <Route index element={<Login />} />
      <Route path="projects/" loader={projectsLoader} element={<Home />} />
      <Route path="login/" element={<Login />} />
      <Route path="sign-up/" element={<Register />} />
      <Route
        path="projects/:project_id/posts/"
        loader={postsByProjectLoader}
        element={<PostDetail />}
      />
      <Route path="projects/:project_id/posts/create/" element={<MakePost />} />
      <Route path="projects/create/" element={<MakeProject />} />
      <Route path="projects/:project_id/" element={<UpdateProject />} />
      <Route
        path="projects/:id/posts/:post_param_id/update"
        element={<UpdatePost />}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
