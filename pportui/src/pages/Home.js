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
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Home() {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const projectsData = useLoaderData();

  console.log(projectsData);

  const cardSxStyle = {
    maxWidth: 500,
    minWidth: 275,
    p: 2,
  };

  return (
    <Box component={"div"} sx={{ display: "flex" }}>
      {
        <Grid container>
          {projectsData.map((project) => {
            return (
              <Grid item lg={12} key={project.id}>
                <Card>
                  <CardActionArea>
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
                          {project.creator[0]}
                        </Avatar>
                      }
                      title={project.creator}
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
                          axiosInstance.delete(`projects/${project.id}/`);
                          navigate(`/`);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit post"
                        onClick={() => {
                          navigate(`projects/${project.id}`);
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
    </Box>
  );
}

export const projectsLoader = async () => {
  const response = await axiosInstance.get("projects/");
  return response.data;
};
