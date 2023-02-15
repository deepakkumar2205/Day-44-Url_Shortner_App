import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { signupAction } from '../../../Redux/Reducers/Signup.reducer';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
      {'Copyright © '}
      {/* <Link color="inherit">
        Your Website
      </Link>{' '} */}
      Your Website
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SignUp() {
   
  //show password and hide password toggle state.
  const [passwordState, setPasswordState ] = React.useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const init = useSelector((state)=>state.signup.credentials)

  //! yup validate
  const useValidateSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email address")
      .required("Email id is required"),
    firstName: yup
      .string()
      .min(3, "Enter a valid name")
      .required("First name is required"),
    lastName: yup
      .string()
      .min(1, "Enter a valid name")
      .required("Last name is required"),
    password: yup
      .string()
      .min(8, "Password should have 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Password is required"),
  });

  //! formik
  const {values,handleChange,handleBlur  ,touched , errors ,handleSubmit } = useFormik({
      initialValues: init,
      validationSchema  : useValidateSchema,
      //! submit form
      onSubmit :(values)=>{
        dispatch(signupAction(values))
      }
  })
  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline /> 
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ mt: 1 }} onSubmit={handleSubmit} component='form'>
            {/* //! email id */}
            <TextField
              margin="normal"
              fullWidth
            //   id="email"
              label="Email Address"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error= {touched.email && errors.email ? true:false}
              helperText = {errors.email}
              autoFocus
              
            />
            {/* //! first name  */}
            <TextField
              margin="normal"
              value={values.firstName}
              onChange={handleChange}
              fullWidth
              name="firstName"
              label="First Name"
              onBlur={handleBlur}
              type="text"
              error= {touched.firstName && errors.firstName ? true:false}
              helperText = {touched.firstName ? errors.firstName : null}
            //   id="firstName"
            />
            {/* //! last name */}
            <TextField
              margin="normal"
              fullWidth
              name="lastName"
              label="Last Name"
              onBlur={handleBlur}
              type="text"
              value={values.lastName}
              onChange={handleChange}
            //   id="lastName"
              error= {touched.lastName && errors.lastName ? true:false}
              helperText = {errors.lastName}
            />
            {/* //! password */}
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              type={passwordState?"password":"text"}
              error= {touched.password && errors.password ? true:false}
              helperText = {errors.password}
            //   id="password"
            />
            {/* //! confirm password */}
            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              value={values.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              error= {touched.confirmPassword && errors.confirmPassword ? true:false}
              type={passwordState?"password":"text"}
              helperText={errors.confirmPassword}
            //   id="confirmPassword"
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
             
              </Grid>
              <Grid item>
                <Link onClick={()=>navigate('/')} variant="body2">
                  {"Already Have an Account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

export default React.memo(SignUp)