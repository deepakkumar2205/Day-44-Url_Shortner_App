// REDUX STORE
// DETAILS NEEDED
// 1. CREATE STORE
import { configureStore } from '@reduxjs/toolkit';
// IMPORT REDUCERS
import LoginReducer from './Reducers/Login.reducer';
import SignupReducer from './Reducers/Signup.reducer';
import ThemeReducer from './Reducers/Theme.reducer';
import urlsReducer from './Reducers/urls.reducer';

export default configureStore({
  reducer: {
    login: LoginReducer, 
    signup: SignupReducer,
    theme: ThemeReducer,
    urls:urlsReducer
  },
}) ;
