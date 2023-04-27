import { Button, Input } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getData, toastFuncDanger } from '../axios'
import BasicTable from './Table';
import { useLocation, useNavigate } from 'react-router-dom';

const Info = () => {
    const [ state , setState] = useState({flag:false ,info:[] });
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    const {state : stateval} = useLocation();
    
    let shortUrl = stateval.shortUrl
    useEffect(()=>{
      setUrl(shortUrl)
    },[])
    useEffect(()=>{
      if(url !== ""){
        console.log('trigering');
        handleSubmit() 
      }
    },[url])

    const handleSubmit = ()=>{
      getData(url)
      .then((data)=>{
        setState({flag: true ,info:data.data })
      })
      .catch((err)=>{
        if(err.response.status === 404){
           toastFuncDanger("Url Not Found")
        }
      })
    }
  return (
    <div className='h-100' style={{minHeight:"94vh"}}>
        <div className='d-flex' style={{textAlign:"start",position:"static"}}>
          <Button onClick={()=>navigate("/urls")} variant='contained'>Back</Button>
        </div>
        <h1>Get User Url Info</h1>
        <label>Short Url &nbsp;</label>
        <Input type='text' onChange={(e)=>setUrl(e.target.value)} value={url}></Input>
        <button  onClick={()=>handleSubmit()}>Get Info</button>
        <br/>
        <br/>
          {state.flag && <BasicTable  data={state.info} url={url}/>}
    </div>
  )
}

export default Info