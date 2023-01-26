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
import { useLoaderData, useParams } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext, useState } from "react";
import axiosInstance from "../api/axios";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PostDetail() {
  const postsData = useLoaderData();

  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const { project_id } = useParams;

  const [editTarget, setEditTarget] = useState();

  const cardSxStyle = {
    maxWidth: 475,
    minWidth: 300,
  };

  return (
    <Box
      component={"div"}
      sx={{ display: "flex", justifyContent: "center", p: 2 }}
    >
      <Grid
        container
        spacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: "100%" }}
      >
        {postsData.map((post, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: 0 }}>
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
                      sx={{ height: "40px", width: "40px" }}
                      alt="author-avatar"
                    >
                      {post.author}
                    </Avatar>
                  }
                  title={post.author}
                  subheader={post.created_on}
                />
                <CardContent>
                  <Typography varient="h1">{post.title}</Typography>
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
                        axiosInstance.delete(`posts/${post.id}/`);
                        navigate(`projects/${project_id}/posts/`);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit post"
                      onClick={() => {
                        setEditTarget(post.id);
                        navigate(
                          `projects/${project_id}/posts/${editTarget}/update`
                        );
                      }}
                    >
                      <EditIcon icon_id={post.id} />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export const postsLoader = async () => {
  const response = await axiosInstance.get("posts/");
  return response.data;
};
