import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../url';

export const Signup = createSlice({
  name: "signup",
  initialState: {
    credentials: { email: "",
                   firstName:"",
                   lastName:"",
                   password: "",
                   confirmPassword:""
                 }
  },
  reducers: {
    // WHATEVER YOU WRITE INSIDE IT IS CALLED AS ACTION CREATOR
    signupAction: (state, action) => {
      state.credentials = action.payload;
      let data = {...action.payload }
      delete data.confirmPassword;

      axios({
        method:"post",
        url: ` ${API}/users/signup`,
        data:data
      }).then((response)=>{
        if(response.status === 401){
          throw new Error(response.statusText)
        }else if(response.status === 200){
              //toast config below
              toast.success('Check your email and click the link to verify your E-Mail address and then Signin', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                });
        }
      })
      .catch((err)=>{
        console.log(err);
        if(err.response.data.message === 'already exist'){
           //toast config below
           toast.warn('Already Exist', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            });
        }
      })
      state.credentials={ email: "",
      firstName:"",
      lastName:"",
      password: "",
      confirmPassword:""
    }
    },
  },
});

export const { signupAction } = Signup.actions;

export default Signup.reducer;
