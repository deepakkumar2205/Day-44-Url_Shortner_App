import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {product , manufacturer , description} from 'platform';
import { postData, redirectUrl } from './axios';
import CircularProgress from '@mui/material/CircularProgress';

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
              //!If you want device monitoring functionality you uncomment this bellow code . I comment this to increase performance boostup.
            postData({
              info: description,
              shortUrl: shortUrl,
              date: new Date(),
              product: product,
              manufacturer: manufacturer,
            });

          }
         })
         .catch((err) => console.log(err));
    }, [])
    if(state){
      return  <div style={{backgroundColor:"white",height:"100vh",margin:'-32px',display:"flex",justifyContent:'center',alignItems:"center"}}>
                          <CircularProgress color='secondary' size={80}/>
              </div>
    }else{
      return <div style={{backgroundColor:"white",height:"100vh",margin:'-32px'}}><h1 style={{margin:'0',color:'black'}}>404 Page Not Found!</h1></div>
    }
}
