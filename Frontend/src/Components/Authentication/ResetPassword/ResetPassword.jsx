import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import API from '../../../url';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Your Website
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function ResetPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //! yup validate
  const useValidateSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email id is required")
  });

  //!formik
  const { values, handleChange , errors, handleSubmit}=useFormik({
    initialValues :{email:""},
    validationSchema:useValidateSchema,
    //! submit form
    onSubmit :(values)=>{
      axios({
        method:"post",
        url:`${API}/users/resetpassword`,
        data:values
      }).then((res)=>{
        if(res.status === 200){
            toast.success('Check your email and click the link to reset password', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: localStorage.getItem("theme") === null ?'light': localStorage.getItem("theme"),
                });
        }
      })
      .catch((err)=>{
        if(err.response.status === 401){
            toast.error('Invalid Credentials', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: localStorage.getItem("theme") === null ?'light': localStorage.getItem("theme")
                });
        }
      })
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box  sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ForwardToInboxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Change
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type='email'
            value={values.email}
            helperText = {errors.email}
            onChange={handleChange}
            error={errors.email? true: false}
            autoFocus
            autoComplete='email'
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send reset link
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={() => navigate("/")} variant="body2">
                Login page!
              </Link>
            </Grid>
            <Grid item>
              <Link
               onClick={() => navigate("/signup")}
               variant="body2"
               >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}