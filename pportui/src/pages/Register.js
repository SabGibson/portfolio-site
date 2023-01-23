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

const Register = () => {
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
      .post("auth/users", {
        email: data.email,
        password: data.password,
        re_password: data.re_password,
      })
      .then((res) => {
        console.log(res.data);
        console.log("user created");
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
        <Typography variant="h1">Join Now</Typography>
        <Typography variant="body2">Start sharing your projefcts</Typography>
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
            name="repassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
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
                Sign Up
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
export default Register;
