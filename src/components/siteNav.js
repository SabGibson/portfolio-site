import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../assets/logo.svg";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import DefaultProfilePic from "../assets/anon_user.png";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useTheme } from "@mui/material/styles";
import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import Container from "@mui/material/Container";
import axiosInstance from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user";

const drawerWidth = 240;

const SiteNav = () => {
  const navigate = useNavigate();

  const isLoggedin = Boolean(localStorage.getItem("access_token"));
  console.log(isLoggedin);
  const dispatch = useDispatch();
  const { userAccount } = useSelector((state) => state.reducer.user);
  const authedAccount = Boolean(userAccount);

  const theme = useTheme;
  const [open, setOpen] = useState(false);

  const handelOpenDrawer = () => {
    setOpen(true);
  };

  const handelCloseDrawer = () => {
    setOpen(false);
  };

  const LogoutCall = () => {
    if (isLoggedin) {
      const response = axiosInstance.post("logout/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers["Authorization"] = null;
      dispatch(logoutUser);
      navigate("/login/");
    } else {
      navigate("/login/");
    }
  };

  const AppBarSxStyle = {
    width: "100%",
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      ml: `${drawerWidth}px`,
    }),
  };
  const containerSxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoSxStyle = {
    height: 80,
  };

  const drawerSxStyle = {
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  };

  const drawerHeaderSxStyle = {
    display: "flex",
    alignContent: "center",
    justifyContent: "flex-end",
    p: 3,
    height: "30px",
  };

  const drawerAnonActionsSxStyle = {
    display: "flex",
    flexDirection: "column",
    p: 3,
    ...(isLoggedin && { display: "none" }),
  };

  const drawerAuthedActionsSxStyle = {
    display: "none",
    ...(isLoggedin && { display: "flex" }),
  };
  const avatarSxStyle = {
    height: 60,
    width: 60,
    background: "#2596be",
  };

  const mainSxStyle = {
    mt: "100px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    ...(open && {
      width: `100% - ${drawerWidth}px`,
      ml: `${drawerWidth}px`,
    }),
  };
  return (
    <Container sx={{ maxWidth: "xxl" }}>
      <Box
        component="div"
        sx={{
          display: "block",
        }}
      >
        <AppBar sx={AppBarSxStyle}>
          <Toolbar sx={containerSxStyle}>
            <Box
              component={"div"}
              sx={{
                width: "20%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open-drawer menu"
                onClick={handelOpenDrawer}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Link to={"/projects/"}>
              <Box
                component="img"
                sx={logoSxStyle}
                src={Logo}
                alt="site-logo"
              />
            </Link>
            <Box component={"div"} sx={{ width: "20%" }}></Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={drawerSxStyle}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <Box component={"div"} sx={drawerHeaderSxStyle}>
            <IconButton edge="end" onClick={handelCloseDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box component={"div"} sx={drawerAnonActionsSxStyle}>
            <Button
              variant="contained"
              aria-label="sign-up button"
              onClick={() => {
                navigate("/sign-up/");
              }}
            >
              Sign-Up
            </Button>
            <Typography variant="body" sx={{ p: 0.5, textAlign: "center" }}>
              or
            </Typography>
            <Button
              variant="contained"
              arial-label="login button"
              onClick={() => {
                navigate("/login/");
              }}
            >
              Login
            </Button>
          </Box>
          <Box component={"div"} sx={drawerAuthedActionsSxStyle}>
            <Card
              sx={{
                width: `${drawerWidth}px`,
                background: "secondary",
                boxShadow: "none",
              }}
            >
              {isLoggedin && (
                <CardHeader
                  avatar={
                    <Avatar sx={avatarSxStyle} alt="profile-avatar">
                      {userAccount.username.slice(0, 2)}
                    </Avatar>
                  }
                  title={userAccount.first_name}
                  subheader={`@${userAccount.username}`}
                />
              )}
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
                disableSpacing
              >
                <IconButton onClick={LogoutCall} aria-label="logout">
                  <LogoutIcon />
                </IconButton>
                <IconButton
                  aria-label="home page"
                  edge="end"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    navigate("/projects/");
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Box>
          <Divider />
        </Drawer>
      </Box>
      <Box sx={mainSxStyle}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default SiteNav;
