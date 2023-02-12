import { padding } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { redirectUrl } from './axios';

export const Home = () => {
  const [state, setState] =useState(true);
    const {shortUrl} =useParams()
    useEffect(() => {
       redirectUrl(shortUrl)
         .then((data) => {
          if(data.data.baseUrl === undefined){
              setState(false)
          }else{
            window.location.assign(data.data.baseUrl)
          }
         })
         .catch((err) => console.log(err));
    }, [])
    if(state){
      return <div style={{backgroundColor:"white",height:"100vh",margin:'-32px'}}></div>
    }else{
      return <div style={{backgroundColor:"white",height:"100vh",margin:'-32px'}}><h1 style={{margin:'0',color:'black'}}>404 Page Not Found!</h1></div>
    }
}
