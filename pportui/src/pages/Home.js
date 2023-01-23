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
import useFetch from "../components/useFetch";

const Home = () => {
  const { appState, data, error } = useFetch("http://localhost:8000/projects");

  const projectsList = [
    {
      image: false,
      date: "20th January, 2023",
      title: "Dummy Title",
      exerpt:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae debitis fugiat ducimus velit eligendi, sequi neque ad est veniam, harum laborum optio modi vero inventore voluptatem quo nemo vitae officia?",
      author: {
        image: DefaultProfilePic,
        name: "Test 'er",
      },
    },
  ];

  const cardSxStyle = {
    maxWidth: 475,
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
        {projectsList.map((project) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: 0 }}>
              <Card sx={cardSxStyle}>
                <CardActionArea>
                  <CardMedia
                    component={"img"}
                    height="140"
                    image={project.image ? project.image : DefaultBg}
                  />
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ height: "40px", width: "40px" }}
                        src={project.author.image}
                        alt="author-avatar"
                      />
                    }
                    title={project.author.name}
                    subheader={project.date}
                  />
                  <CardContent>
                    <Typography varient="h5" component="div">
                      {project.title}
                    </Typography>
                    <Typography varient="body2">{project.exerpt}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
