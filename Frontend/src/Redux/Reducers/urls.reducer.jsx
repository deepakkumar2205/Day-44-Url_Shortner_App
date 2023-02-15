import { createSlice, current } from '@reduxjs/toolkit';

export const Urls = createSlice({
  name: 'urls',
  initialState: {
    table:"initial",
    form:{title:'',baseUrl:'',shortUrl:''}
  },

  reducers: {
    // WHATEVER YOU WRITE INSIDE IT IS CALLED AS ACTION CREATOR
    TableAction: (state, action) => {
       state.table=action.payload
       state.form.shortUrl = "" 
    },
    FormAction: (state, action) => {
       state.form = action.payload
    },
    ResetForm: (state, action) => {
       state.form ={title:'',baseUrl:'',shortUrl:''}
    },
    ResetShortUrl: (state, action) => {
       state.form.shortUrl =""
    }
  }
});

export const { TableAction, FormAction , ResetForm , ResetShortUrl} = Urls.actions;

export default Urls.reducer;
