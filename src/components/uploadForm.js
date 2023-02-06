import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axiosInstance from "../api/axios";

const UploadFileForm = ({ post_id }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data.attachment[0]);
    const response = await axiosInstance.post(
      `api/posts/${post_id}/files/`,
      {
        title: data.attachment[0].name,
        file: data.attachment[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    window.location.reload();
  };

  return (
    <Box sx={{ width: "50%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("attachment")} type="file" name="attachment" />

        <Button aria-label="upload" type="submit">
          upload
        </Button>
      </form>
    </Box>
  );
};

export default UploadFileForm;
