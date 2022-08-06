import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

//import material ui stuffes
import AppBar from "@mui/material/AppBar";
import { Box, Grid, Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Home = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ flexGrow: 1, minHeight: 80 }}>
          {" "}
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 2 }}>
              Carbon Project
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
            }}
          >
            {" "}
            ad
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Tabs value={value} onChange={handleChange} orientation="vertical">
            <Tab icon={<DashboardIcon />} label="Dashboard" />
            <Tab icon={<AdminPanelSettingsIcon />} label="Administrator" />
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          <Dash />
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(Home);
