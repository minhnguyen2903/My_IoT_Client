import React from "react";
import { Stack, Box, Paper } from "@mui/material";
import DrawerNav from "../components/drawer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../App";
import { dispatch } from "../store";
import { InitData } from "../store/action";
import { useSelector } from "react-redux";
import axiosServices from "../utils/axios";
import Example from "../components/notification";

const MainPage = (props) => {
  const drawer = useSelector((state) => state.drawer);
  const {clientData} = useSelector((state) => state.data);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (!user) {
      navigate("/login", { replace: true });
    } else {
      axiosServices
        .get(`/init/${user.userId}`)
        .then((res) => {
          dispatch(InitData(res.data));
          if (user.userId) {
            socket.on(`${user.userId}/logout`, () => {
              localStorage.removeItem("user");
              navigate("/login", { replace: true });
            });
            socket.on(user.userId, (data) => {
              dispatch(InitData(data));
            });
          }
        })
        .catch((err) => {
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        });
    }
  }, [navigate]);
  return (
    <Stack
      direction="row"
      sx={{
        height: "calc(100vh - 64px)",
        maxWidth: "100vw",
        marginTop: "60px",
      }}
    >
      <Box sx={{ height: "100%", background: "#1976D2" }}>
        <DrawerNav active={drawer.active} />
      </Box>
      <Box sx={{ flexGrow: 1, background: "#fff", minHeight: "100%" }}>
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
  );
};

export default MainPage;
