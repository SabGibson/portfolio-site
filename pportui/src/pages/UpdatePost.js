import { useForm, Controller } from "react-hook-form";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLoaderData, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdatePost = () => {
  const navigate = useNavigate();

  const { project_id, post_param_id } = useParams();

  const [postHist, setPostHist] = useState();

  useEffect(() => {
    axiosInstance.get(`posts/${post_param_id}/`).then((res) => {
      setPostHist(res.data);
    });
  }, []);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    axiosInstance.patch(`posts/${post_param_id}/`, {
      ...postHist,
      title: data.title,
      content: data.content,
    });

    navigate(`projects/${project_id}/posts/`);
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
                label={postHist ? postHist.title : "Title"}
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
                label={postHist ? postHist.content : "Content"}
                type="text"
                fullWidth
                error={!!errors.content}
                helperText={errors.content ? errors.content?.message : " "}
              />
            )}
          />

          <Button type="submit" variant="contained" component="button">
            Update Post
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdatePost;
