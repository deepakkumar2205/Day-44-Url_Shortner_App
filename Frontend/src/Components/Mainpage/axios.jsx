import axios from "axios";
import { toast } from "react-toastify";
import API from "../../url";

export async function  getUrlsFromDb(){
  return  axios({
        url:`${API}/getUrls`,
        headers:{
            _id:localStorage.getItem("_id"),
            'x-Auth-token':localStorage.getItem("x-Auth-token")
        }
    })
}

export async function handleGenerateShortUrlFromBE(){
    return axios({
        url:`${API}/generateShortUrl`,
    })
}

export async function handleDeleteUrl(ide){
    return axios({
        url:`${API}/handleDeleteUrl`,
        method:"post",
        headers:{
            'x-Auth-token':localStorage.getItem("x-Auth-token")
           },
        data:{id:ide}
    })
}

export async function redirectUrl(shortUrl){
    return axios({
        url:`${API}/redirect/${shortUrl}`,
        method:"get",
    })
}

export async function postUrlToDb(values){
    return axios({
        method:"post",
        url:`${API}/postUrl`,
        headers:{
         'x-Auth-token':localStorage.getItem("x-Auth-token")
        },
        data:{...values,userId:localStorage.getItem("_id")}
      })
}

export function toastFunc(text) {
     //toast config below
     toast.error(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: localStorage.getItem("theme"),
        theme: 'colored',
        });
}

export function toastFuncSuccess(text){
       //toast config below
       toast.success(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: localStorage.getItem("theme"),
        theme: 'colored',
        });
}

export function toastFuncWarning(text){
       //toast config below
       toast.warning(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: localStorage.getItem("theme"),
        theme: 'colored',
        });
}


export function toastFuncDanger(text){
       //toast config below
       toast.error(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: localStorage.getItem("theme"),
        theme: 'colored',
        });
}