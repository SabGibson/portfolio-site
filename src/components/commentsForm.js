import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axios";

const CommentsSection = ({ post_id }) => {
  const navigate = useNavigate();
  const { project_id } = useParams();
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await axiosInstance.post(
      `api/posts/${post_id}/comments/`,
      {
        post: post_id,
        content: data.comment,
      }
    );
    console.log(response);
    window.location.reload();
    navigate(`/projects/${project_id}/posts/`);
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Comment"
            multiline
            rows={4}
            varient="standard"
            type="text"
            fullWidth
            error={!!errors.comment}
            helperText={errors.comment ? errors.comment?.message : " "}
          />
        )}
      />
      <Button type="submit" variant="contained" size="small" component="button">
        Comment
      </Button>
    </Box>
  );
};

export default CommentsSection;
