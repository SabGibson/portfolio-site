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
import axiosInstance from "../api/axios";
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const { auth } = useContext(AuthContext);

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
