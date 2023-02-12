import express from 'express';
import shortid from 'shortid';
import { auth } from '../middleware/auth.js';
import { checkUrl, createUrl, deleteShortUrl, getLongUrl, getUsersUrls } from '../services/urls.service.js';
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
})

export default router