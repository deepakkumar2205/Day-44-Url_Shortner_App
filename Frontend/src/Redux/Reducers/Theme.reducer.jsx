import { createTheme } from '@mui/material';
import { createSlice, current } from '@reduxjs/toolkit';

const themeLocal = localStorage.getItem("theme") === null ? 'light' : localStorage.getItem("theme") 
export const Theme = createSlice({
  name: 'theme',
  initialState: createTheme({
      palette:{
          mode    :  themeLocal,
      }
  })  ,
  reducers: {
    // WHATEVER YOU WRITE INSIDE IT IS CALLED AS ACTION CREATOR
    ThemeAction: (state, action) => {
        console.log(current(state).palette.mode);
        if(current(state).palette.mode ==='light'){
          state.palette.mode = 'dark'
          localStorage.setItem("theme",'dark')
          window.location.reload(false)
        }else{
          state.palette.mode = 'light'
          localStorage.setItem("theme",'light')
          window.location.reload(false)

        }
    }
  }
});

export const { ThemeAction } = Theme.actions;

export default Theme.reducer;
