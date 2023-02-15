import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormAction, ResetForm, ResetShortUrl, TableAction } from '../../Redux/Reducers/urls.reducer';
import { getUrlsFromDb, handleGenerateShortUrlFromBE, postUrlToDb, toastFuncSuccess, toastFuncWarning } from './axios.jsx';

 const Form = () => {
  const initial = useSelector((state)=>state.urls.form)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! yup validate
  const useValidateSchema = yup.object().shape({
    title: yup
      .string()
      .min(4, "Name should have atleast 4 letters")
      .required("Title is required"),
    baseUrl: yup
      .string()
      .url("Enter a valid Url")
      .required("Title is required"),
    shortUrl: yup
      .string()
      .min(5,"shortUrl should have atleast 5 letters")
      .required("Title is required"),
  });

 useEffect(() => {
  getUrlsFromDb().then((res)=>{
    if(res.data.length === 0){
      dispatch(TableAction("empty"))
    }else{
      dispatch(TableAction(res.data))
    }
  })
 }, [])
 
  
  //! formik
  const {values ,handleChange,errors,touched,handleBlur,setFieldValue,handleSubmit}= useFormik({
    initialValues:initial,
    validationSchema:useValidateSchema,
    enableReinitialize:true,
    onSubmit:(values)=>{
      dispatch(FormAction(values))
      // ! axios post request
      postUrlToDb(values)
      .then((response)=>{
        getUrlsFromDb().then((res)=>{
          dispatch(TableAction(res.data))
        })
        if(response.status === 201){
          toastFuncSuccess("Created Successfully")
          dispatch(ResetForm())
        }
      })
      .catch((err)=>{
        if(err.response.status ===406){
            toastFuncWarning('ShortUrl Already Exist')
            dispatch(ResetShortUrl())
        }else if(err.request.status === 401){
          navigate("/")
      }
      })
    }
  })

  const handleGenerateShortUrl =()=>{
    handleGenerateShortUrlFromBE()
    .then((res)=>{
      setFieldValue("shortUrl",res.data.shortUrl)
      
    })
  }

  return (
    <div>
      <h3>Fill the Below Form to Create shortUrl</h3>
      <Box sx={{ '& > :not(style)': { m: 3 }}}
           component="form"
           onSubmit={handleSubmit}
      >
      <TextField 
          id="standard-basic"
          label="Title"
          variant="standard"
          name="title"
          onBlur={handleBlur}
          value={values.title}
          type='text'
          onChange={handleChange}
          helperText={!errors.title ? "eg: github" : errors.title}
          error={touched.title && errors.title? true: false}
      />
      <TextField 
          id="standard-basic"
          label="Base Url"
          name="baseUrl"
          value={values.baseUrl}
          onBlur={handleBlur}
          onChange={handleChange}
          error={touched.baseUrl && errors.baseUrl? true: false}
          variant="standard"
          helperText={!errors.baseUrl ? "eg : https://github.com/repository/...":errors.baseUrl}
      />
      <TextField 
          id="standard-basic"
          label="Short Url"
          onBlur={handleBlur}
          name="shortUrl"
          value={values.shortUrl}
          onChange={handleChange}
          error={touched.shortUrl && errors.shortUrl? true: false}
          helperText={!errors.shortUrl ?"eg : github-url (or) xowsholw":errors.shortUrl}
          variant="standard"
      />
      <Tooltip title='genereate short url'>
        <IconButton onClick={()=>handleGenerateShortUrl()}>
          <AutorenewIcon />
        </IconButton>
      </Tooltip>
      <Button type='submit'>
        Create
      </Button>
      </Box>
    </div>
  );
}


export default Form