import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Environment variables for API URLs
const API_REGISTER_URL = process.env.REACT_APP_API_URL || 'https://reqres.in/api/register';
const API_LOGIN_URL = process.env.REACT_APP_API_LOGIN_URL || 'https://reqres.in/api/login';

// Thunk for user registration
export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_REGISTER_URL, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Thunk for user login
export const loginUser = createAsyncThunk(
  'registration/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(API_LOGIN_URL, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.token = action.payload.token;  // Save the token
        console.log("token",state.token)
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default registrationSlice.reducer;
