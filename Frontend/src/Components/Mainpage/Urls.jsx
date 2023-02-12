import { Button, useTheme, useThemeProps, withTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllocationTableComp } from './Table'
import { useNavigate } from 'react-router-dom'
import { ThemeAction } from '../../Redux/Reducers/Theme.reducer'
import Form from './Form'

export const Urls = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <div style={{minHeight:"100vh",width:'100%'}}>
      <div style={{display:'flex',height:'auto',width:'100%',marginLeft:'auto',alignItems:'center',alignSelf:'flex-end'}}>
        <h2>Welcome to Url Shortner</h2>
        <div style={{display:'flex',marginLeft:'auto'}}>
          <Button onClick={()=>dispatch(ThemeAction())}>
           theme
          </Button>
          <Button onClick={()=>{
            localStorage.removeItem("x-Auth-token")
            navigate("/")
          }}>
            LogOut
          </Button>
        </div>
      </div>
      <hr/>
      <br/>
        <Form />
        <br/>
        <AllocationTableComp />
    </div>
  )
}
