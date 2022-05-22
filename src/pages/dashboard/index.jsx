import React from "react";
import { Box, Paper, Stack, Typography, Grid, Chip } from "@mui/material";
import { useSelector } from "react-redux";
import CircleChart from "../../components/circleChart";
import Contact from "../../components/contact";
import LedMode from "../../components/ledMode";
import { useEffect } from "react";
import { dispatch } from "../../store";
import { handleDrawerActive } from "../../store/action";

const getTime = (miniSec) => {
  const sec = (Date.now() - miniSec > 0 && Date.now() - miniSec) || 0;
  const seconds = Math.floor(sec / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return `Cập nhập: ${
    (days && `${days} ngày`) ||
    (hours && `${hours} giờ`) ||
    (minutes && `${minutes} phút`) ||
    `${seconds} giây`
  } trước`;
};

const Dashboard = () => {
  const clientData = useSelector((state) => state.data.clientData);
  useEffect(() => {
    dispatch(handleDrawerActive(1));
  }, []);
  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 1 }}>
        <Chip label={getTime(clientData.lastRequest)} color="success"></Chip>
      </Paper>
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid
          item
          md={12}
          sm={12}
          lg={4}
          sx={{ padding: 0, display: "flex", justifyContent: "center" }}
        >
          <Grid container spacing={2} sx={{ width: "100%" }}>
            {clientData.sensor.map((item, index) => (
              <Grid item lg={12} md={6} sm={6} xs={12} key={index}>
                <Paper elevation={4} sx={{ padding: 2, height: "100%" }}>
                  <Stack direction="column" spacing={2} alignItems="center">
                    <CircleChart
                      title={item.name}
                      data={item.value}
                      unit={item.unit}
                    />
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          lg={8}
          sx={{ padding: 0, display: "flex", justifyContent: "center" }}
        >
          <Paper sx={{ padding: 2, width: "100%" }} elevation={4}>
            <Box>
              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Bảng điều khiển
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={4} lg={4} xs={12} sm={12}>
                  <Box
                    sx={{
                      flex: "1",
                      padding: 2,
                      height: "100%",
                      background: "#1976D2",
                    }}
                  >
                    <Contact
                      title="Bóng đèn"
                      params="output0"
                      status={clientData.output0}
                    />
                  </Box>
                </Grid>
                <Grid item md={4} lg={4} xs={12} sm={12}>
                  <Box
                    sx={{
                      flex: "1",
                      padding: 2,
                      height: "100%",
                      background: "#1976D2",
                    }}
                  >
                    <Contact
                      title="Quạt"
                      params="output1"
                      status={clientData.output1}
                    />
                  </Box>
                </Grid>
                <Grid item md={4} lg={4} xs={12} sm={12}>
                  <Box
                    sx={{
                      flex: "1",
                      padding: 2,
                      height: "100%",
                      background: "#1976D2",
                    }}
                  >
                    <Contact
                      title="Còi cảnh báo"
                      params="output2"
                      status={clientData.output2}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
