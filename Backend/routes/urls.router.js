import express from 'express';
import shortid from 'shortid';
import { auth } from '../middleware/auth.js';
import {  addData, checkUrl, createUrl, deleteShortUrl, getData, getLongUrl, getUsersUrls, updateCount } from '../services/urls.service.js';
const router = express.Router();


router.post('/postUrl',auth,express.json(),async function(request, response){
   const data = request.body;
   const addUrl = await checkUrl(data.shortUrl);
   if(addUrl){
      response.status(406).send("shortUrl already exist")
   }else{
      const addurl = await createUrl(data)
      response.status(201).send("created successfully")
   }
})

router.post('/postData',express.json(),async function(request, response){
   const data = request.body;
   const addUrl = await addData(data);
   if(addUrl){
      response.status(200).send("posted successfully")
   }else{
      response.status(201).send("error")
   }
})

router.post('/getData',express.json(),async function(request, response){
   const {shortUrl} = request.body;
   const info = await getData(shortUrl);
   if(info){
      response.status(200).send(info.info)
   }else{
      response.status(404).send("error")
   }
})

router.get('/getUrls',auth,express.json(),async function(request, response){
   const data  = request.header("_id");
   const res = await getUsersUrls(data)
   response.send(res)
})

router.get('/generateShortUrl',express.json(),async function(request, response){
   const shortUrl = shortid.generate();
   const check = await checkUrl(shortUrl);
   if(check){
      response.send("shortUrl genareation failed")
   }else{
      response.send({shortUrl:shortUrl})
   }

})

router.post('/handleDeleteUrl',auth,express.json(),async function(request, response){
   const id= request.body;
   const result = await deleteShortUrl(id);
   response.send(result)
})

router.get('/redirect/:shortUrl',express.json(),async function(request, response){
   const {shortUrl}  = request.params;
   const res = await getLongUrl(shortUrl)
   response.send(res)
   if(res !== null){
      await updateCount(res._id,res.count)
   }
})

export default router