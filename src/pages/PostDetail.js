import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useLoaderData, useParams } from "react-router-dom";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/postCard";
export default function PostDetail() {
  const postsData = useLoaderData();
  const { project_id } = useParams();
  const navigate = useNavigate();

  const fabStyle = {
    position: "absolute",
    bottom: "40%",
    right: "5%",
  };

  const pageTitle = {
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    my: 2,
  };

  return (
    <Box
      component={"div"}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      <Typography sx={pageTitle} variant="h4">
        Posts for Project No.#{project_id}
      </Typography>
      <Fab
        sx={{ alignItems: "center", ...fabStyle }}
        color="seconprimarydary"
        aria-label="add"
        onClick={() => {
          navigate(`/projects/${project_id}/posts/create/`);
        }}
      >
        <AddIcon />
      </Fab>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mx: "auto",
        }}
      >
        {postsData.map((post) => {
          return <PostCard post={post} project_id={project_id} key={post.id} />;
        })}
      </Box>
    </Box>
  );
}

export const postsByProjectLoader = async ({ params }) => {
  const response = await axiosInstance.get(
    `api/special/${params.project_id}/posts/`
  );

  return response.data;
};
