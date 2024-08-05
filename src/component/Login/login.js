import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { font_Size, fonts, colors } from '../../comon/Common';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';
import './login.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SnakbarTool from '../snakbar/Snakbar';
import { loginUser } from '../reducer/auth_reducer';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.registration.status);
  console.log("login status",loginStatus)
  const loginError = useSelector((state) => state.registration.error);
  console.log("login status error",loginError)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let err = {};
    if (!data.email) {
      err.email = "need a valid email";
    }
    if (!data.password) {
      err.password = "need a valid password";
    }
    setError(err);
    if (Object.keys(err).length === 0) {
      dispatch(loginUser(data));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      setSnackbarMessage(loginStatus);
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/rightDrawer"); // Replace with your next page
      }, 3000);
    } else if (loginError === 'failed') {
      setSnackbarMessage(loginError);
      setSnackbarOpen(true);
    }
  }, [loginStatus,loginError, navigate]);

  return (
    <Box className="loginContainer">
      {/* Welcome text with animation */}
      <Typography className="fadeIn">
        Welcome to the Login Page
      </Typography>

      {/* Form Container */}
      <Box component="form" className="formContainer" onSubmit={submitHandler}>
        {/* Input fields with icons */}
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          className="textField"
          name='email'
          onChange={handleChange}
          value={data.email}
          error={!!error.email}
          helperText={error.email}
          InputProps={{
            endAdornment: (
              <MailOutlineIcon style={{ marginRight: '10px', color: colors.primary, font: fonts.primary, fontSize: font_Size.title }} />
            ),
          }}
        />
        <TextField
          variant="outlined"
          placeholder="Enter your password"
          type="password"
          name='password'
          value={data.password}
          error={!!error.password}
          helperText={error.password}
          className="textField"
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <KeyIcon style={{ marginRight: '10px', color: colors.primary, font: fonts.primary, fontSize: font_Size.title }} />
            ),
          }}
        />

        {/* Remember me and forgot password */}
        <Box className="checkBoxContainer">
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
          />
          <Typography>
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: colors.primary, font: fonts.primary, fontSize: font_Size.text }}>
              Forgot Password?
            </Link>
          </Typography>
        </Box>

        {/* Submit button */}
        <Button variant="contained" className="submitButton" type="submit">
          Login
        </Button>
        <Typography>
          <Link to="/register" style={{ textDecoration: 'none', color: colors.black_color, font: fonts.primary, fontSize: font_Size.text }}>
            New Member ? <span style={{ color: colors.primary, font: fonts.primary, fontSize: font_Size.text }}>Register here</span>
          </Link>
        </Typography>
      </Box>

      {/* Snackbar */}
      <SnakbarTool open={snackbarOpen} handleClose={handleSnackbarClose} message={snackbarMessage} />
    </Box>
  );
};

export default Login;
