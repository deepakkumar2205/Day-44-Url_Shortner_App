import { ObjectId } from 'mongodb';
import { client } from '../index.js';

//Database Name
const database = 'Url-Shortner'

export async function createUrl(data) {
    return await client.db(database).collection("urls").insertOne({...data,count:0});
}

export async function getLongUrl(data) {
    return  await client.db(database).collection("urls").findOne({shortUrl:data},{projection:{baseUrl:1,count:1}});
}

export async function addData({info ,date ,shortUrl ,product , manufacturer}) {
    const id =await client.db(database).collection("urls").findOne({shortUrl:shortUrl},{projection:{_id:1,info:1}})
    return await client.db(database).collection("urls").updateOne({_id:id._id},{$set:{info:[...id.info,
        {info:info , date: date,product: product,manufacturer: manufacturer,}]}});          
}

export async function getData(data) {
    return await client.db(database).collection("urls").findOne({shortUrl:data},{projection:{info:1}});
}

export async function checkUrl(data) {
    return await client.db(database).collection("urls").findOne({shortUrl:data});
}

export async function getUsersUrls(data) {
    return  await client.db(database).collection("urls").find({userId:data}).toArray();
}

export async function updateCount(data,count) {

    return  await client.db(database).collection("urls").updateOne({_id:data},{$set:{count:count+1}})
}

export async function deleteShortUrl(data) {

    return  await client.db(database).collection("urls").deleteOne({_id:new ObjectId(data)});
}
