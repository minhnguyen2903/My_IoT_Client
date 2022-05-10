import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosRequest from '../../utils/axios';
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, Paper } from '@mui/material';
import backgroundImg from './background.jpg';
const theme = createTheme();

export default function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get('productId') && data.get('password')) {
      axiosRequest.post('/login', {
        username: data.get('productId'),
        password: data.get('password')
      }).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate(`/`, { replace: true });
      }).catch(err => {
        console.log(err);
        alert("Tài khoản hoặc mật khẩu không đúng");
      })
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}></Box>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            padding: 2,
            display: 'flex',
            height: '60vh',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'white',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="productId"
              label="productId"
              name="productId"
              autoComplete="productId"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}