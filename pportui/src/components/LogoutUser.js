import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

const { auth, setAuth } = useContext(AuthContext);
const navigate = useNavigate();

export default function LogoutUserCall() {
  if (auth.authed) {
    const response = axiosInstance.post("logout/", {
      refresh: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    setAuth({ authed: false });
    navigate("/login");
  } else {
    navigate("/login");
  }
}
