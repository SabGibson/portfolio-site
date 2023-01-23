import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const Login = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log("errors", errors);
  console.log("watch vars", watch("email"));

  const onSubmit = (data) => {
    console.log(data);
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
              <Button {...field} type="submit">
                Submit
              </Button>
            )}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
