import React from 'react';
import { Box, Paper, Stack, Typography, Grid, Chip } from "@mui/material"
import { useSelector } from "react-redux"
import CircleChart from "../../components/circleChart"
import Contact from "../../components/contact"
import LedMode from "../../components/ledMode"
import { useEffect } from "react"
import { dispatch } from "../../store"
import { handleDrawerActive } from "../../store/action"

const getTime = (miniSec) => {
  const sec = Date.now() - miniSec;
  const seconds = Math.floor((sec) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return "Cập nhập: " + `${days && `${days} ngày` || hours && `${hours} giờ` || minutes && `${minutes} phút` || `${seconds} giây`}`;
}

const Dashboard = () => {
  const clientData = useSelector(state => state.data.clientData);
  useEffect(() => {
    dispatch(handleDrawerActive(1));
  }, []);
  return (
    <Box>
      <Paper elevation={3} sx={{ margin: 1, padding: 1 }}>
        <Chip label={getTime(clientData.lastRequest)} color="success"></Chip>
      </Paper>
      <Stack direction="row" spacing={2}>
        <Stack direction="column" spacing={2} sx={{ flex: '1' }} >
          {clientData.sensor.map((item, index) => <Paper key={index} elevation={4} sx={{ padding: 2 }}>
            <Stack direction="column" spacing={2} alignItems="center">
              <CircleChart title={item.name} data={item.value} unit={item.unit} />
            </Stack>
          </Paper>)}
        </Stack>
        <Paper sx={{ flex: '2', padding: 2 }} elevation={4}>
          <Box>
            <Typography variant="h4" sx={{ textAlign: "center" }}>Bảng điều khiển</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ flex: '1', padding: 2, height: "100%", background: "#1976D2" }}>
                  <Contact title="Thiết bị 1" params="output0" status={clientData.output0} />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ flex: '1', padding: 2, height: "100%", background: "#1976D2" }}>
                  <Contact title="Thiết bị 2" params="output1" status={clientData.output1} />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ flex: '1', padding: 2, height: "100%", background: "#1976D2" }}>
                  <Contact title="Thiết bị 3" params="output2" status={clientData.output2} />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>Điều khiển Led</Typography>
            <LedMode mode={clientData.ledMode} />
          </Box>
        </Paper>
      </Stack>
    </Box>
  )
}

export default Dashboard