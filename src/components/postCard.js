import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import axiosInstance from "../api/axios";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const PostCard = ({ post, project_id, key }) => {
  const [expanded, setExpanded] = useState(false);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(180deg)" : "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const cardSxStyle = {
    maxWidth: 375,
    minWidth: 280,
    m: 1,
    p: 1,
    flex: "1 1 0px",
    boxShadow: 15,
    ...(expanded && {}),
  };

  const CommentCardSxStyle = {
    maxWidth: 375,
    minWidth: 280,
    position: "relative",
    background: "#EDEDED",
    top: -412,
    height: "100%",
    m: 1,
    p: 1,
    flex: "1 1 0px",
    boxShadow: 15,
    ...(!expanded && {
      display: "none",
    }),
  };

  const navigate = useNavigate();

  return (
    <Box componant={"div"}>
      <Card sx={cardSxStyle} aria-label="user-post" key={key}>
        <CardMedia
          component={"img"}
          height="160"
          sx={{ border: "1px solid grey", borderRadius: "5px" }}
          image={
            post.images.length > 0
              ? post.images[Math.floor(Math.random() * post.images.length)]
                  .image
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
                navigate(`/projects/${project_id}/posts/${post.id}/update`);
              }}
            >
              <EditIcon icon_id={post.id} />
            </IconButton>
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={() => {
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
      <Card sx={CommentCardSxStyle} aria-label="user-post" key={key}>
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
                navigate(`/projects/${project_id}/posts/${post.id}/update`);
              }}
            >
              <EditIcon icon_id={post.id} />
            </IconButton>
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={(e) => {
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <CardHeader subheader="Attachments" />
        <Divider />
        <CardHeader subheader="Images" />
        <Divider />
        <CardHeader subheader="Comments" />
      </Card>
    </Box>
  );
};

export default PostCard;
