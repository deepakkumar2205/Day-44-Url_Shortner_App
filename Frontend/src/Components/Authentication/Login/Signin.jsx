import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { LoginAction } from '../../../Redux/Reducers/Login.reducer';
import API from '../../../url';
import { toastFunc, toastFuncSuccess, toastFuncWarning } from '../../Mainpage/axios';

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


export default function SignIn() {

  const [passwordState, setPasswordState ] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state)=>state.login.credentials)
  const [button, setButton] = React.useState('Sign In');

  //! yup validate
  const useValidateSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email id is required"),
    password: yup
      .string()
      .min(8, "Enter a valid Password")
      .required("Password is required")
  });

  //!formik
  const { values, handleChange,touched ,handleBlur , errors, handleSubmit}=useFormik({
    initialValues :loginData,
    validationSchema:useValidateSchema,
    //! submit form
    onSubmit :(values)=>{
      setButton('loading')
      // dispatch(LoginAction(values))
      axios({
        method:"post",
        url: `${API}/users/login`,
        data:values
      }).then((response)=>{
       if(response.status === 200){
        localStorage.setItem("x-Auth-token",response.data.token)
        localStorage.setItem("_id",response.data._id)
        navigate("/urls")
        //toast config below
       toastFuncSuccess('Successfully logged In')
       toastFunc(`😁 Welcome ${response.data.user} !`)
       }
      }).catch((err)=>{
        console.log(err);
        if(err.response.status === 405){
           //toast config below
          toastFuncSuccess('Check your email and click the link to verify your E-Mail address and then Signin',)
        }else if(err.response.status === 401){
          setButton("Sign in")
            //toast config below
           toastFuncWarning('Invalid Credentials')
        }
      })
    }
  })

  return (
    <Container component="main" maxWidth="xs" height='100vh' >
      <CssBaseline />
      <Box  sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            helperText = { errors.email? errors.email: false}
            onChange={handleChange}
            error={touched.email && errors.email? true: false}
            
            />
          <TextField
            margin="normal"
            label="Password"
            fullWidth
            name="password"
            id="password"
            value={values.password}
            onBlur={handleBlur}
            error={ touched.password && errors.password? true: false}
            helperText = { errors.password? errors.password : false}
            onChange={handleChange}
            type={passwordState ? "password" : "text"}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onClick={() => setPasswordState(!passwordState)}
              />
            }
            label="Show password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {button === 'loading' ?<CircularProgress color='inherit' size={30}/>:button }
            
          </Button>
          <Grid container>
            <Grid item xs>
              <Link   onClick={() => navigate("/resetpassword")} variant="body2">
                Forgot password?
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