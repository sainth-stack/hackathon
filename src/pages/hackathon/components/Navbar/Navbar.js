import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Agi-Agents", link: "/agi-agents" },
    { text: "Hackathon", link: "/hackathon" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#1a2940",
        boxShadow: "2px 3px 10px rgba(0, 0, 0, 0.5)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        minHeight: "80px",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "80px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Navbar Title */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: { xs: 1, md: 0 },
            textAlign: { xs: "center", md: "left" },
            color: "white",
          }}
        >
       Agi-Agents
        </Typography>

        {/* Menu Items for Desktop */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            alignItems: "center",
          }}
        >
          {menuItems.map((item, index) => (
            <Button
              key={index}
              component={Link}
              to={item.link}
              sx={{
                fontSize:"1rem",
                color: "white",
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
