import { ObjectId } from 'mongodb';
import { client } from '../index.js';

//Database Name
const database = 'Url-Shortner'

export async function createUrl(data) {
    return await client.db(database).collection("urls").insertOne(data);
}

export async function getLongUrl(data) {
    return  await client.db(database).collection("urls").findOne({shortUrl:data},{projection:{baseUrl:1}});
}

export async function checkUrl(data) {
    return await client.db(database).collection("urls").findOne({shortUrl:data});
}

export async function getUsersUrls(data) {

    return  await client.db(database).collection("urls").find({userId:data}).toArray();
}

export async function deleteShortUrl(data) {

    return  await client.db(database).collection("urls").deleteOne({_id:new ObjectId(data)});
}