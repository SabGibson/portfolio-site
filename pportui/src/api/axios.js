import axios from "axios";

const baseURL = "http://loaclhost:8000/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh_token");

    if (refreshToken) {
      const splitToken = JSON.parse(atob(refreshToken.split(".")[1]));

      const now = Math.ceil(Date.now() / 1000);
      if (splitToken.exp > now) {
        return axiosInstance
          .post("auth/jwt/refresh/", { refresh: refreshToken })
          .then((res) => {
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            axiosInstance.defaults.headers["Authorization"] =
              "JWT " + res.data.access;
            originalRequest.headers["Authorization"] = "JWT " + res.data.access;

            return axiosInstance(originalRequest);
          });
      }
    }
  }
);

export default axiosInstance;
