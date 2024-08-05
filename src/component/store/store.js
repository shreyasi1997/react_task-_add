import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from '../reducer/auth_reducer';

const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
  devTools: true,
});

export default store;
