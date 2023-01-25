import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const useLogoutUser = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
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
  });
};

export default useLogoutUser;
