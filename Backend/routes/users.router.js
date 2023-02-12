import express from 'express';
import bcrypt from 'bcrypt';
import {
  createUser,
  generateHashedPassword,
  getUsers,
  addToken,
  getDataFromSessionCollection,
  updateVerification,
  checkString,
  changePasswordInDB,
  deleteOneString,
  getProfilePic
} from "../services/user.service.js";
import randomstring from 'randomstring';
import jwt from 'jsonwebtoken';
import {auth} from '../middleware/auth.js'
import sendEmail from '../utils/sendEmail.js';
const router = express.Router();

//!below api is foront end api to use to send mail.
const API = "https://s-u.netlify.app";
router.post('/signup',express.json(),async function(request, response){
    const { email, password, firstName, lastName} = request.body;
    const hashedPassword =await generateHashedPassword(password);
    const userPresentOrNot = await getUsers(email); 
    if(userPresentOrNot == null ){
      const result = await createUser({
        email        : email,
        password     : hashedPassword,
        firstName    :firstName,
        emailVerified:'no',
        lastName     :lastName,
      });
      //!create token to verify mail.
      let  token = randomstring.generate();
      
      const verificationInitiate = await addToken({
        email:email,
        token:token,
        DateTime: new Date()
      });
      const mail =await sendEmail(email,"verification token" , `${API}/emailverify/${token}`)   
      response.send({
        message: "successfully Created ",
        verificationInitiate: verificationInitiate,
        ...result,
      }); //Js object -->json
    }else if(password.length<8){                                                                                    
        response.status(400).send({message : 'password must be at least 8 characters'})
    }else{
        response.status(400).send({message: "already exist"})
    }
  })

router.get('/verifyemail/:id',express.json(),async function(request, response){
    const { id } = request.params ;
    const getData = await getDataFromSessionCollection(id);
    if(getData.value){
      const update =await updateVerification(getData.value.email)
      response.status(200).send({
        message:"verified successful"
      })
    }else{
      response.status(404).send({
        message:"invalid credential"
      })
    }
})

//below route is to check the email and generate the reset password link and send to mail
router.post('/resetpassword',express.json(),async function(request, response){
    const data = request.body;
    const getData = await getUsers(data.email);
    if(getData){
      //!create string to reset mail and send to mail.
      const randString = randomstring.generate()
      const verificationInitiate = await addToken({
        email:data.email,
        randString:randString,
        DateTime: new Date()
      });
      
      const mail =await sendEmail(data.email,"Reset Password" , `${API}/resetPassPage/${randString}`)  
      response.status(200).send({message:'successfull'})
    }else{
      response.status(401).send({message:'invalid credentials'})
    }
    
    
})
//to get the string and checked wether it is available or not.
router.get('/resetpassword/:string',express.json(),async function(request, response){
  const {string} =request.params;
  const getResult =await checkString(string);
  if(getResult){
    response.status(200).send({message:"present",email:getResult.email})
  }else{
    response.status(404).send({message:"abscent"})
  }
})

//to reset and password and delete from the database.
router.post('/changePassword/:string',express.json(),async function(request,response){
  const {string} =request.params;
  const data =request.body;
   const hashedPassword = await generateHashedPassword(data.password)
   const removingfromDb= await deleteOneString(string)
   if(removingfromDb.deletedCount === 1){
     //!changeing password
     const changeInDB = await changePasswordInDB({
       email:data.email,password:hashedPassword
      });
      response.status(200 ).send({message:"successfull"})
    }else{
      response.send({message:"Invalid "})
    }
})

//dashboard verification to prevent duplicate tokens and fake users access.
router.get('/verifyToken',auth,express.json(),async function(request,response){
  const _id  = request.header("_id");
  const profile =await getProfilePic(_id)
  response.send({message:'success',data:profile})
})

router.post('/login',express.json(),async function(request, response){
  const {email , password} = request.body;
  const userFromDB = await  getUsers(email);
  //!below if condition is used to find the data present in db or not.
  if(userFromDB == null){
    response.status(401).send({message:"Invalid credentials"})
  }else{
    const myobjectId = userFromDB._id
    //!This if conditon is used to find the user email is verified or not.
    if(userFromDB.emailVerified == 'yes'){    
        const storedDBPassword = userFromDB.password ;
        const isPasswordCheck = await bcrypt.compare( password , storedDBPassword );
        //!This if condition is used to validate the password.
            if(isPasswordCheck){
              const token = jwt.sign({ foo: userFromDB._id }, process.env.SECRET_KEY);
              response.status(200).send({
                message: "succeful login",
                user : `${userFromDB.firstName} ${userFromDB.lastName}`,
                token: token,
                roleId: userFromDB.roleId,
                _id:myobjectId.toString()
              });
            }else{
              response.status(401).send({message:"Invalid credentials"})
            }
    }else{
      //!create token to verify mail.
      const token = randomstring.generate();
      const verificationInitiate = await addToken({
        email:email,
        token:token,
        DateTime: new Date()
      });
      const mail =await sendEmail(email,"verification token" , `${API}/emailverify/${token}`)  
      response.status(405).send({message:"Invalid credentials"})
    }
  }
})

export default router