import { Input } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getData, toastFuncDanger } from '../axios'
import BasicTable from './Table';

const Info = () => {
    const [ state , setState] = useState({flag:false ,info:[] });
    const [url, setUrl] = useState("");
    
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
    <div>
        <h1>Get User Url Info</h1>
        <label>Short Url &nbsp;</label>
        <Input type='text' onChange={(e)=>setUrl(e.target.value)}></Input>
        <button  onClick={()=>handleSubmit()}>Get Info</button>
        <br/>
        <br/>
        {state.flag && <BasicTable  data={state.info} url={url}/>}
    </div>
  )
}

export default Info