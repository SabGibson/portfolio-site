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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { randomColor } from "../components/colorGen";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CommentsSection from "./commentsForm";
import UploadFileForm from "./uploadForm";
import AddImage from "./addImagesForm";

const PostCard = ({ post, project_id, key }) => {
  const [expanded, setExpanded] = useState(false);
  const [addImage, setAddImage] = useState(false);

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
    height: "60%",
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
    <Box componant={"div"} sx={{ flex: "1 1 0px" }}>
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
                window.location.reload();
                navigate(`/projects/${project_id}/posts/`);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="add picture"
              onClick={() => {
                navigate(`/projects/${project_id}/posts/${post.id}/update`);
              }}
            >
              <EditIcon icon_id={post.id} />
            </IconButton>
            <IconButton
              aria-label="add project picture"
              onClick={() => {
                setAddImage(!addImage);
              }}
            >
              <AddPhotoAlternateIcon icon_id={post.id} />
            </IconButton>
            <AddImage
              addImage={addImage}
              setAddImage={setAddImage}
              post_id={post.id}
            />
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
                navigate(0);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit post"
              onClick={() => {
                navigate(`/projects/${project_id}/posts/${post.id}/update`);
                navigate(0);
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
            aria-label="show less"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <CardHeader subheader="Attachments" />
        <CardContent
          sx={{
            display: "flex",
            flex: "1 1 0px",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <UploadFileForm post_id={post.id} />
          {post.files.length > 0 ? (
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {post.files.map((file) => {
                return (
                  <Typography
                    component="a"
                    href={file.file}
                    sx={{ fontSize: ".8rem" }}
                    variant="body2"
                  >
                    attachment#{file.id}
                  </Typography>
                );
              })}
            </Box>
          ) : (
            <Typography> No attchements</Typography>
          )}
        </CardContent>

        <Divider />
        <CardHeader subheader="Comments" />
        <CardContent>
          {post.comments.length > 0 ? (
            <Box
              componant="div"
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "274px",
                mx: "auto",
                display: "flex",
                justifyContent: "flex-start",
                overflowY: "scroll",
                mb: 2,
              }}
            >
              <List sx={{ width: "100%" }}>
                {post.comments.map((comment) => {
                  return (
                    <ListItem alignItems="flex-start" sx={{ p: 0.5 }}>
                      <Avatar
                        sx={{
                          width: "40px",
                          height: "40px",
                          background: randomColor,
                          border: "1px solid black",
                        }}
                      >
                        {comment.author.username.slice(0, 2)}
                      </Avatar>
                      <ListItemText
                        sx={{ ml: 2 }}
                        primary={comment.content}
                        secondary={
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.created_on}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          ) : (
            <Typography> No comments</Typography>
          )}
          <CommentsSection post_id={post.id} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PostCard;
