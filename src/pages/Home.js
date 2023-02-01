import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import DefaultBg from "../assets/default_bg.jpg";
import Avatar from "@mui/material/Avatar";
import DefaultProfilePic from "../assets/anon_user.png";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import axiosInstance from "../api/axios";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import Login from "./Login";

export default function Home() {

  const userReady = Boolean(localStorage.getItem("current_user"))
  const navigate = useNavigate();
  const projectsData = useLoaderData();

  const cardSxStyle = {
    maxWidth: 500,
    minWidth: 275,
    p: 1,
  };

  const fabStyle = {
    position: "absolute",
    bottom: "40%",
    right: "5%",
  };

  return (
    <Box>
      {!userReady && <Login />}
      {userReady && (
        <Box
          component={"div"}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography sx={{ textAlign: "center", width: "100%" }} variant="h4">
            Project Home
          </Typography>
          {
            <Grid sx={{ maxWidth: "90%" }} spacing={5} container>
              {projectsData.map((project) => {
                return (
                  <Grid item xs={12} key={project.id}>
                    <Card sx={{ minWidth: 200 }}>
                      <CardActionArea
                        onClick={() => {
                          navigate(`api/projects/${project.id}/posts/`);
                        }}
                        aria-label="navigate to project posts on click"
                      >
                        <CardMedia
                          component={"img"}
                          height="140"
                          image={
                            project.images.length
                              ? project.images[0].image
                              : DefaultBg
                          }
                        />
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ height: "40px", width: "40px" }}
                              alt="author-avatar"
                            >
                              {"project.creator.username"}
                            </Avatar>
                          }
                          title={project.creator.username}
                          subheader={project.created_on}
                        />
                        <CardContent>
                          <Typography varient="h5" component="div">
                            {project.title}
                          </Typography>
                          <Typography varient="body2">
                            {project.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
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
                              axiosInstance.delete(`api/projects/${project.id}/`);
                              navigate(`/`);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="edit post"
                            onClick={() => {
                              console.log(project.id);
                              navigate(`/projects/${project.id}/`);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          }
          <Fab
            sx={{ alignItems: "center", ...fabStyle }}
            color="seconprimarydary"
            onClick={() => {
              navigate("/projects/create/");
            }}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </Box>
      )}
    </Box>
  );
}

export const projectsLoader = async () => {
  const response = await axiosInstance.get("api/projects/");
  return response.data;
};
