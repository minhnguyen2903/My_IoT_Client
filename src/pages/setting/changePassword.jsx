import { Box, Button, Stack, TextField } from "@mui/material"
import * as React from 'react'
import axiosServices from "../../utils/axios";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, Paper } from '@mui/material';
const ChangePassword = () => {
  const [password, setPassword] = React.useState({
    password: "",
    submitPassword: ""
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }
  const submit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setSubmitting(true);
    if (password.password === password.submitPassword) {
      axiosServices.post("/change-password", {
        password: password.password,
        userId: user.userId
      }).then(res => {
        alert("Đôi mật khẩu thành công");
        setPassword({password: '', submitPassword: ''});
      }).catch(err => {
        alert("Đôi mật khẩu thất bại");
      }).finally(() => {
        setSubmitting(false);
      });
    } else {
      alert("mật khẩu không trùng khớp");
      setSubmitting(false);
    }
  }
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <TextField
          required
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setPassword({ ...password, password: e.target.value });
          }}
          value={password.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <TextField
          required
          name="submitPassword"
          label="Xác nhận mật khẩu"
          type={showPassword ? 'text' : 'password'}
          id="submitPassword"
          value={password.submitPassword}
          autoComplete="current-password"
          onChange={(e) => {
            setPassword({ ...password, submitPassword: e.target.value });
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button color="primary" variant="contained" onClick={submit} disabled={submitting}>Xác nhận</Button>
      </Stack>
    </Box>
  )
}

export default ChangePassword