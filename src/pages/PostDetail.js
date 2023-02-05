import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import DefaultBg from "../assets/default_bg.jpg";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  useLoaderData,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import axiosInstance from "../api/axios";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

export default function PostDetail() {
  const postsData = useLoaderData();
  const { project_id } = useParams();
  const navigate = useNavigate();

  const cardSxStyle = {
    maxWidth: 375,
    minWidth: 280,
    m: 1,
    p: 1,
    flex: "1 1 0px",
  };

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
        Post for project {project_id}
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
          return (
            <Card sx={cardSxStyle} aria-label="user-post" key={post.id}>
              <CardMedia
                component={"img"}
                height="140"
                image={
                  post.images.length > 0
                    ? post.images[
                        Math.floor(Math.random() * post.images.length)
                      ].image
                    : DefaultBg
                }
                alt="post image"
              />
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      height: "40px",
                      width: "40px",
                    }}
                    alt="author-avatar"
                  >
                    {post.author.username.slice(0, 2)}
                  </Avatar>
                }
                title={post.author.username}
                subheader={post.created_on}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                {post.content.split(/\r?\n/).map((msg) => {
                  return <Typography paragraph>{msg}</Typography>;
                })}
              </CardContent>
              <Divider />
              <CardActions
                sx={{
                  display: "flex-block",
                  justifyContent: "space-between",
                }}
              >
                <Box component={"div"} sx={{ justifyContent: "start" }}>
                  <IconButton
                    aria-label="delete post"
                    onClick={() => {
                      axiosInstance.delete(`api/posts/${post.id}/`);
                      navigate(`/projects/${project_id}/posts/`);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit post"
                    onClick={() => {
                      navigate(
                        `/projects/${project_id}/posts/${post.id}/update`
                      );
                    }}
                  >
                    <EditIcon icon_id={post.id} />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          );
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
