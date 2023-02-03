import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import ProjectImage from "../assets/make_project.jpg";
import { useSelector } from "react-redux";

const MakeProject = () => {
  const navigate = useNavigate();
  const { userAccount } = useSelector((state) => state.reducer.user);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosInstance.post("api/projects/", {
      creator: userAccount,
      title: data.title,
      description: data.content,
    });
    navigate("/projects/");
  };

  return (
    <Container sx={{ disply: "flex", justifyContent: "center" }}>
      <Box
        component={"div"}
        sx={{ disply: "flex", justifyContent: "center" }}
        className="PageForm"
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            borderRadius: "5px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ width: "50%", p: 2 }}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  sx={{ my: 2 }}
                  varient="standard"
                  type="text"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? errors.title?.message : " "}
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ my: 2 }}
                  varient="standard"
                  label="Content"
                  type="text"
                  fullWidth
                  error={!!errors.content}
                  helperText={errors.content ? errors.content?.message : " "}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              component="button"
            >
              Create
            </Button>
            <Typography sx={{ alignText: "start", mt: 2 }} variant="h5">
              Get started on a new project!
            </Typography>
          </Box>
          <Box
            component={"img"}
            src={ProjectImage}
            alt="Make project image"
            sx={{ maxWidth: "50%", borderRadius: "5px", minWidth: 300 }}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default MakeProject;
