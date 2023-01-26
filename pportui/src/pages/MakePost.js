import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const MakePost = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosInstance
      .post("auth/users/", {
        email: data.email,
        username: data.username,
        password: data.password,
        re_password: data.confirmPassword,
      })
      .then((res) => {
        console.log(res);
        console.log("user created");
        navigate("/login");
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
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                varient="standard"
                type="text"
                fullWidth
                error={!!errors.username}
                helperText={errors.username ? errors.username?.message : " "}
              />
            )}
          />
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
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                varient="standard"
                type="password"
                fullWidth
                error={!!errors.re_password}
                helperText={
                  errors.re_password ? errors.re_password?.message : " "
                }
              />
            )}
          />

          <Button type="submit" variant="contained" component="button">
            Sign up
          </Button>
        </Box>
        <Box component={"div"}>
          <Typography variant="body2">
            Already have an account? <Link to={"/login"}>Sign in</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
export default MakePost;
