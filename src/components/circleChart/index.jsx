import { Box, Paper, Stack, Typography, Grid } from "@mui/material";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease-in-out",
};

const style = {
  width: "230px",
  height: "230px",
  borderRadius: "50%",
  background: "white",
  marginTop: 2,
};

const style1 = {
  width: "210px",
  height: "210px",
  borderRadius: "50%",
  background: "white",
};

const style2 = {
  width: "190px",
  height: "190px",
  borderRadius: "50%",
  background: "white",
};

const CircleChart = (props) => {
  return (
    <>
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
        {props.title}
      </Typography>
      <Paper sx={{ ...style, ...flex }} elevation={4}>
        <Paper sx={{ ...style1, ...flex, backgroundColor: `hsl(${props.data < 100 ? 100 - props.data : '0'}, 100%, 50%)`  }} elevation={4}>
          <Paper sx={{ ...style2, ...flex }} elevation={4}>
            <Typography variant="h3" sx={{ fontWeight: "bold"}}>
              {props.data}{props.unit}
            </Typography>
          </Paper>
        </Paper>
      </Paper>
    </>
  );
};

export default CircleChart;
