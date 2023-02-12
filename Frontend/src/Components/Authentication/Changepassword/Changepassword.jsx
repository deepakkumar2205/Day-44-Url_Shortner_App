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
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { LoginAction } from '../../../Redux/Reducers/Login.reducer';
import LockResetIcon from '@mui/icons-material/LockReset';

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


export default function Changepassword() {

  const [passwordState, setPasswordState ] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state)=>state.login.credentials)

  //! yup validate
  const useValidateSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email id is required"),
    password: yup
      .string()
      .min(7, "Enter a valid Password")
      .required("Password is required")
  });

  //!formik
  const { values, handleChange , errors, handleSubmit}=useFormik({
    initialValues :loginData,
    validationSchema:useValidateSchema,
    //! submit form
    onSubmit :(values)=>{
      console.log(values)
      dispatch(LoginAction(values))
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
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Change
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            value={values.email}
            helperText = {errors.email}
            onChange={handleChange}
            error={errors.email? true: false}
            autoFocus
            autoComplete='email'
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirmPassword"
            value={values.password}
            error={errors.password? true: false}
            helperText = {errors.password}
            onChange={handleChange}
            type={passwordState ? "password" : "text"}
            id="password"
            autoComplete='password'
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
            Change Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/signup' variant="body2">
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