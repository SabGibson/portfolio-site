import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

const UpdateProject = () => {
  const navigate = useNavigate();
  const { project_id } = useParams();

  const [projHist, setProjHist] = useState();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    axiosInstance.patch(`projects/${project_id}/`, {
      ...projHist,
      title: data.title,
      description: data.content,
    });

    navigate(`projects/`);
  };

  return (
    <Container sx={{ disply: "flex", justifyContent: "center" }}>
      <Box
        component={"div"}
        sx={{ disply: "flex", justifyContent: "center" }}
        className="PageForm"
      >
        <Typography variant="body2">Start sharing your projefcts</Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
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
                varient="standard"
                label="Description"
                type="text"
                fullWidth
                error={!!errors.content}
                helperText={errors.content ? errors.content?.message : " "}
              />
            )}
          />

          <Button type="submit" variant="contained" component="button">
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default UpdateProject;
