import { Box, Stack } from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";
import { userPostRequest } from "../../utils/helper/helperRequest";
import { useState } from "react";
const LedMode = (props) => {
  return (
    <Box>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-form-control-label-placement"
          name="position"
          value={props.mode}
          onChange={(e) => {
            userPostRequest('/ledMode', {
              ledMode: e.target.value
            }).then(response => {
              console.log(response.data)
            }).catch(err => {
              throw err;
            })
          }}
        >
          <FormControlLabel
            value="case1"
            control={<Radio />}
            label="Mode1"
            labelPlacement="top"
          />
          <FormControlLabel
            value="case2"
            control={<Radio />}
            label="Mode2"
            labelPlacement="top"
          />
          <FormControlLabel
            value="case3"
            control={<Radio />}
            label="Mode3"
            labelPlacement="top"
          />
          <FormControlLabel
            value="case4"
            control={<Radio />}
            label="Mode4"
            labelPlacement="top"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

export default LedMode;