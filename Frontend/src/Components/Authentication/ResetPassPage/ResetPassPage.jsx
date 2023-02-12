import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { LoginAction } from '../../../Redux/Reducers/Login.reducer';
import API from '../../../url';
import { resetingPassword, resetPasswordPageCheck, toastFuncDanger, toastFuncSuccess, toastFuncWarning } from '../../Mainpage/axios';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import { LinearProgress } from '@mui/material';

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


export function ResetPassPage() {

  const [passwordState, setPasswordState ] = React.useState(true);
  const navigate = useNavigate();
  const { string } = useParams();
  const [ flag , setFlag ] = React.useState(true);
  const [state, setState ] = React.useState("Loading");
  const [button,setButton] = React.useState("Reset");
  const [mailId, setMailid] =React.useState("");

  //! flag to verify
  if(flag){
    setFlag(false);
    resetPasswordPageCheck(string)
    .then((res)=>{
        setMailid(res.data.email);
        if(res.status === 200){
            setState("success")
        }
    }).catch((err)=>{
        if(err.response.status === 200){
            setState("success")
        } else if (err.response.status === 404){
          setState("invalid")
        }
    })
  }

  //! yup validate
  const useValidateSchema = yup.object({
    password: yup
      .string()
      .min(8, "Password should have 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Confirm Password is required")
      
  });

  //!formik
  const { values, handleChange,touched ,handleBlur , errors, handleSubmit}=useFormik({
    initialValues :{
        password:"",
        confirmPassword:""
    },
    validationSchema:useValidateSchema,
    //! submit form
    onSubmit :(values)=>{
        const info = {
            email: mailId,
            password: values.password
        }
      resetingPassword(string,info)
      .then((res)=>{
        if(res.data.message === 'successfull'){
            setButton("Success")
            toastFuncSuccess("Password Changed Successfully")
            navigate("/")
        }else if(res.data.message === 'Invalid '){
            toastFuncDanger("Something went wrong")
        }
      })
      .catch((err)=>console.log(err))
    }
  })
  console.log(state);
  return (
    <div sx={{ width: '100%' }}>
    {state === 'Loading'?<Box>
        <LinearProgress />
    </Box>:state === 'success'? <Container component="main" maxWidth="xs" height='100vh' >
      <CssBaseline />
      <Box  sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "light blue" }}>
          <LockResetOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            onBlur={handleBlur}
            helperText = { errors.password? errors.password: false}
            onChange={handleChange}
            error={touched.password && errors.password? true: false}
            type={passwordState ? "password" : "text"}
          />
          <TextField
            margin="normal"
            label="Confirm Password"
            fullWidth
            name="confirmPassword"
            id="confirmPassword"
            onBlur={handleBlur}
            error={ touched.confirmPassword && errors.confirmPassword? true: false}
            helperText = { errors.confirmPassword? errors.confirmPassword : false}
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
           {button}
          </Button>
         
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container> : <h1>invalid</h1>}
    </div>
  );
}