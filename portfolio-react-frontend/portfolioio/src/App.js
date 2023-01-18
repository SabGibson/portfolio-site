import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Account from "./pages/Account";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
