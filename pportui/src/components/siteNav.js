import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "../assets/logo.svg";
import React, { useState } from "react";
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
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import NoteIcon from "@mui/icons-material/Note";
import BadgeIcon from "@mui/icons-material/Badge";
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
const drawerWidth = 240;

const SiteNav = (props) => {
  const { history } = props;

  const routeItems = {
    cardLinks: [
      { text: "account-settings", icon: <SettingsIcon />, route: "/account" },
    ],

    generalLinks: [{ text: "Home", icon: <HomeIcon />, route: "/" }],

    authedLinks: [{}],
  };

  const isLoggedin = false;
  const account = {
    displayName: "Test User",
    username: "@Tester123",
    profilePicture: false,
    profilePath: "path",
  };
  const theme = useTheme;
  const [open, setOpen] = useState(false);

  const handelOpenDrawer = () => {
    setOpen(true);
  };

  const handelCloseDrawer = () => {
    setOpen(false);
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
    background: "grey",
  };

  const mainSxStyle = {
    mt: "80px",
    display: "flex",
    border: "solid 3px blue" /*remove after development*/,
    width: "100%",
    justifyContent: "center",
    ...(open && {
      width: `100% - ${drawerWidth}px`,
      ml: `${drawerWidth}px`,
    }),
  };
  return (
    <Container sx={{ maxWidth: "xl" }}>
      <Box
        component="div"
        sx={{
          display: "block",
        }}
      >
        <Box component={"div"} sx={mainSxStyle}>
          <Outlet />
        </Box>
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

            <Box component="img" sx={logoSxStyle} src={Logo} alt="site-logo" />
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
            <Button variant="contained" aria-label="sign-up button">
              Sign-Up
            </Button>
            <Typography variant="body" sx={{ p: 0.5 }}>
              or
            </Typography>
            <Button variant="contained" arial-label="login button">
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
              <CardHeader
                avatar={
                  <Avatar
                    sx={avatarSxStyle}
                    alt="profile-picture"
                    src={
                      account.profilePicture
                        ? account.profilePath
                        : DefaultProfilePic
                    }
                  >
                    {account.displayName[0]}
                  </Avatar>
                }
                title={account.displayName}
                subheader={account.username}
              />
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
                disableSpacing
              >
                <IconButton aria-label="logout">
                  <LogoutIcon />
                </IconButton>
                <IconButton aria-label="settings" edge="end" sx={{ mr: 1 }}>
                  <SettingsIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Box>
          <Divider />
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <List component={"nav"} aria-label="site-navigation" disablePadding>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <BadgeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Divider />
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <List component={"nav"} aria-label="site-navigation" disablePadding>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountTreeIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Projects" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>
                    <NoteIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Posts" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          <Divider />
        </Drawer>
      </Box>
    </Container>
  );
};

export default SiteNav;
