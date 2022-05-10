import { Paper, Stack, Button, Switch, Typography } from "@mui/material"
import axios from "../../utils/axios"
import { useState, useEffect } from "react"
import { userPostRequest } from "../../utils/helper/helperRequest";
const Contact = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = async (params) => {
    setIsLoading(true);
    await userPostRequest("/contact", {
      output: params
    }).then(response => {
      console.log(response)
    }).catch(err => {});
    setIsLoading(false);
  }

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography>Off</Typography>
        <Switch checked={props.status} disabled={isLoading} inputProps={{ 'aria-label': 'ant design' }} onChange={() => {
          handleChange(props.params)
        }} />
        <Typography>On</Typography>
      </Stack>
      <Typography textAlign="center">
        {props.title}
      </Typography>
    </Paper>
  )
}

export default Contact;