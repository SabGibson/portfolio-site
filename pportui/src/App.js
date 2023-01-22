import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import SiteNav from "./components/siteNav";
import Register from "./pages/Register";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SiteNav />}>
      <Route path="home" element={<Home />} />
      <Route path="sign-up" element={<Register />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
