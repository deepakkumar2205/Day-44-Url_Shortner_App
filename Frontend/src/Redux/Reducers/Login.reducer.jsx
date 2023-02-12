import { createSlice } from '@reduxjs/toolkit';

export const Login = createSlice({
  name: 'login',
  initialState: {
    credentials: {email:'',password:''},
  },
  reducers: {
    // WHATEVER YOU WRITE INSIDE IT IS CALLED AS ACTION CREATOR
    LoginAction: (state, action) => {
        state.credentials = action.payload
    }
    }
});

export const { LoginAction } = Login.actions;

export default Login.reducer;
