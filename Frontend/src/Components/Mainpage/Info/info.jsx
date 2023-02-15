import React, { useEffect, useState } from 'react'
import { getData } from '../axios'
import BasicTable from './Table';

const Info = () => {
    const [ state , setState] = useState({flag:false ,info:[] });
    useEffect(() => {
      getData('pizza')
      .then((data)=>{
        console.log(data)
        setState({flag: true ,info:data.data })
      })
      .catch((err)=>console.log(err))
    }, [])
    
  return (
    <div>
        <h1>Get User Url Info</h1>
        <label>Short Url</label>
        <input type='text'></input>
        <BasicTable  data={state.info}/>
    </div>
  )
}

export default Info