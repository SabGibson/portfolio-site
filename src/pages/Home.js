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
import { useLoaderData, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useSelector } from "react-redux";
import { randomColor } from "../components/colorGen";

export default function Home() {
  const navigate = useNavigate();
  const projectsData = useLoaderData();
  const { userAccount } = useSelector((state) => state.reducer.user);

  const userReady = Boolean(userAccount);

  const cardSxStyle = {
    maxWidth: 375,
    minWidth: 280,
    m: 1,
    p: 1,
    flex: "1 1 0px",
    boxShadow: 15,
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
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      {!userReady && <Login />}
      {userReady && (
        <Box
          component={"div"}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <Typography sx={pageTitle} variant="h4">
            Project Home
          </Typography>
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
          {
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                mx: "auto",
              }}
            >
              {projectsData.map((project) => {
                return (
                  <Card sx={cardSxStyle} key={project.id}>
                    <CardActionArea
                      onClick={() => {
                        navigate(`/projects/${project.id}/posts/`);
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

                      <CardContent sx={{ height: "120px" }}>
                        <Typography
                          varient="h5"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.35rem",
                            mb: 2,
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography varient="body2">
                          {project.description}
                        </Typography>
                      </CardContent>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{
                              height: "50px",
                              width: "50px",
                            }}
                            alt="author-avatar"
                          >
                            {project.creator.username.slice(0, 2)}
                          </Avatar>
                        }
                        title={project.creator.username}
                        subheader={project.created_on}
                      />
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
                            navigate(`/projects/${project.id}/`);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </CardActions>
                  </Card>
                );
              })}
            </Box>
          }
        </Box>
      )}
    </Box>
  );
}

export const projectsLoader = async () => {
  const response = await axiosInstance.get("api/projects/");
  return response.data;
};
