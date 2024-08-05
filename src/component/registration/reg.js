import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import { colors } from '../../comon/Common'; // Import colors if not already
import './reg.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import SnakbarTool from '../snakbar/Snakbar';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../reducer/auth_reducer';
const Registration = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const registrationStatus = useSelector((state) => state?.registration?.status);
  console.log("selected status",registrationStatus)
  const registrationError = useSelector((state) => state?.registration?.error);
  const [data, setData] = useState({
    mobile_no: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const [check, setCheck] = useState(false);
  const [err, setError] = useState({
    mobile_no: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let error = {};
    if (!data.mobile_no) {
      error.mobile_no = "Mobile number is required";
    } else if (data.mobile_no.length < 10) {
      error.mobile_no = "You need to enter a valid phone number";
    }
    if (!data.email) {
      error.email = "Email is required";
    }
    if (!data.password) {
      error.password = "Password is required";
    }
    if (data.password !== data.confirm_password) {
      error.confirm_password = "Passwords must match";
    }
    setError(error);

    if (Object.keys(error).length === 0) {
      dispatch(registerUser(data));
      console.log("All data", data);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  React.useEffect(() => {
    if (registrationStatus === 'succeeded') {
      setSnackbarMessage(registrationStatus);
      setSnackbarOpen(true);
      setTimeout(() => navigate("/login"), 3000);
    } else if (registrationStatus === 'failed') {
      setSnackbarMessage(registrationError);
      setSnackbarOpen(true);
    }
  }, [registrationStatus, registrationError, navigate]);

  return (
    <Box className="registrationContainer">
      {/* Welcome text with animation */}
      <Typography className="fadeIn">
        Welcome to the Registration Page
      </Typography>
      {/* Form Container */}
      <Box component="form" className="formContainer" onSubmit={submitHandler}>
        {/* Phone number field */}
        <TextField
          variant="outlined"
          placeholder="Enter your phone number"
          className="textField"
          name="mobile_no"
          value={data.mobile_no}
          onChange={handleChange}
          error={!!err.mobile_no}
          helperText={err.mobile_no}
          InputProps={{
            endAdornment: (
              <PhoneIcon style={{ marginLeft: '10px', color: '#6C63FF' }} />
            ),
          }}
        />

        {/* Email field */}
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={!!err.email}
          helperText={err.email}
          className="textField"
          InputProps={{
            endAdornment: (
              <MailOutlineIcon style={{ marginLeft: '10px', color: '#6C63FF' }} />
            ),
          }}
        />

        {/* Password field */}
        <TextField
          variant="outlined"
          placeholder="Enter your password"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={!!err.password}
          helperText={err.password}
          className="textField"
          InputProps={{
            endAdornment: (
              <KeyIcon style={{ marginLeft: '10px', color: '#6C63FF' }} />
            ),
          }}
        />

        {/* Confirm Password field */}
        <TextField
          variant="outlined"
          placeholder="Confirm your password"
          type="password"
          name="confirm_password"
          value={data.confirm_password}
          onChange={handleChange}
          error={!!err.confirm_password}
          helperText={err.confirm_password}
          className="textField"
          InputProps={{
            endAdornment: (
              <LockIcon style={{ marginLeft: '10px', color: '#6C63FF' }} />
            ),
          }}
        />

        {/* Terms and conditions */}
        <Box className="checkBoxContainer">
          <FormControlLabel
            control={<Checkbox checked={check} onChange={(e) => setCheck(e.target.checked)} />}
            label="I agree to the terms and conditions"
          />
        </Box>

        {/* Register button */}
        <Button variant="contained" color="primary" className="submitButton" type="submit" disabled={!check} >
          Register
        </Button>

        {/* Login link */}
        <Typography>
          Already have an account?
          <Link
            to="/login"
            style={{ textDecoration: 'none', color: colors.black_color }}
          >
            <span style={{ color: colors.primary }}> Login here</span>
          </Link>
        </Typography>
      </Box>

      {/* Snackbar */}
      <SnakbarTool open={snackbarOpen} handleClose={handleSnackbarClose} message={snackbarMessage} />
    </Box>
  );
};

export default Registration;
