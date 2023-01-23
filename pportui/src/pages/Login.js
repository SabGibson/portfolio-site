import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import axiosInstance from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    axiosInstance
      .post("auth/jwt/create", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log(res.data);

        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container sx={{ disply: "flex", justifyContent: "center" }}>
      <Box
        component={"div"}
        sx={{ disply: "flex", justifyContent: "center" }}
        className="PageForm"
      >
        <Typography variant="h1">Sign In</Typography>
        <Typography variant="body2">Sign into your Account</Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                varient="standard"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : " "}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                varient="standard"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : " "}
              />
            )}
          />
          <Controller
            name="submit"
            control={control}
            render={({ field }) => (
              <Button {...field} type="submit" variant="contained">
                Login
              </Button>
            )}
          />
        </Box>
        <Box component={"div"}>
          <Typography variant="body2">
            Don't have an account? <Link to={"/sign-up"}>Sign Up</Link>
          </Typography>
          <Typography variant="body2">
            Forgot your password ?{" "}
            <Link to={"/reset-password"}>Reset password</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
