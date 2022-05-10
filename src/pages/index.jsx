import React from "react";
import { Stack, Box, Paper } from "@mui/material";
import DrawerNav from "../components/drawer";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import Dashboard from "./dashboard";
import Chart from "./chart";
import { useEffect } from "react";
import { socket } from "../App";
import { dispatch } from "../store";
import { InitData } from "../store/action";
import { useSelector } from "react-redux";
import axiosServices from "../utils/axios";


const MainPage = (props) => {
  const drawer = useSelector(state => state.drawer);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      axiosServices.get(`/init/${user.userId}`).then(res => {
        dispatch(InitData(res.data));
      }).catch(err => {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      });
    }
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    user &&
      socket.on(user.userId, (data) => {
        dispatch(InitData(data));
      });
      socket.on(`${user.userId}/logout` ,() => {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      })
  }, []);
  return (
    <Stack direction="row" sx={{ height: "calc(100vh - 64px)", maxWidth: "100vw" }}>
      <Box sx={{ height: '100%', background: '#1976D2' }}>
        <DrawerNav active={drawer.active} />
      </Box>
      <Box
        sx={{ flexGrow: 1, background: "#fff", minHeight: "100%" }}
      >
        <Paper
          elevation={0}
          sx={{
            background: "none",
            margin: "15px",
            borderRadius: 2,
            height: "calc(100% - 50px)",
            maxHeight: "calc(100% - 50px)",
            maxWidth: "100%",
            padding: "10px",
          }}
        >
          {props.children}
        </Paper>
      </Box>
    </Stack>
  )
}

export default MainPage;