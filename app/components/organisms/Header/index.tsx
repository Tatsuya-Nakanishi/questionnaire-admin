"use client";
import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import React from "react";

export default function Component() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link href="/home" underline="none" color="inherit">
            アンケート 管理画面
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
