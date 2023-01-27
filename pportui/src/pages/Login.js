import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
import axiosInstance from "../api/axios";
import SigninImage from "../assets/planning_tools.jpg";

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
      .post("auth/jwt/create/", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        console.log(res.data);
        setAuth({ authed: true });
        navigate("/projects/");
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  return (
    <Container sx={{ disply: "flex", justifyContent: "center" }}>
      <Box
        component={"div"}
        sx={{ disply: "flex", justifyContent: "center" }}
        className="PageForm"
      >
        <Typography sx={{ textAlign: "center" }} variant="h1">
          Sign In
        </Typography>
        <Typography sx={{ textAlign: "center" }} variant="h5">
          Sign into your Account
        </Typography>
        <Box
          component={"img"}
          src={SigninImage}
          sx={{
            width: "100%",
            textAlign: "center",
            my: 2,
            mx: "auto",
            borderRadius: "1%",
          }}
          alt="sign in image of planner"
        />

        <Box
          sx={{ height: "100%" }}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                varient="standard"
                type="text"
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
          <Button type="submit" variant="contained" component="button">
            Login
          </Button>
        </Box>
        <Box sx={{ my: 2 }} component={"div"}>
          <Typography variant="body2">
            Don't have an account? <Link to={"/sign-up"}>Sign Up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
