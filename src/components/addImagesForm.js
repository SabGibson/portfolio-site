import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axiosInstance from "../api/axios";
const AddImage = ({ addImage, setAddImage, post_id }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const response = await axiosInstance.post(
      `api/posts/${post_id}/images/`,
      {
        alt: data.image[0].name,
        image: data.image[0],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    window.location.reload();
    setAddImage(false);
  };

  return (
    <Box
      sx={{
        display: "none",
        ...(addImage && {
          display: "flex",
        }),
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("image")} type="file" name="image" />

        <Button aria-label="upload" type="submit">
          upload
        </Button>
      </form>
    </Box>
  );
};

export default AddImage;
