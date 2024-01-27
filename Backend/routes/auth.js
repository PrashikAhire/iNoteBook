const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JSON_SECRET = "prry#sagoodb@y";


//Route 1 :create a User using '/api/auth/createuser' .No login required(sign up)
router.post('/createuser',[
  body('name','Enter a valid name').isLength({min : 3}),
  body('email').isEmail(),
  body('password').isLength({min : 5})
],async(req,res)=>{
let success = false ;

  //the below code follows the above body constraints and if there is error then it prints an error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
  }

  try {
  // if the same email already exists
  let user = await User.findOne({email:req.body.email})
  if(user){
    return res.status(400).json({success,error:"sorry this email already exists"})
  }

  //generation of salt(as this function returns a promise that's why make it await  "jab tak ye promise resolve nahi hota age nahi jana hai is liye await laga ke output ane ke bad he aage jayenge ")
   const salt = await bcrypt.genSaltSync(10);
   //passing our pass word with salt to hash function(as this function returns a promise that's why make it await)
   const secpass = await bcrypt.hash(req.body.password,salt)     
  
    //create a new user
    user = await User.create({
      name : req.body.name,
      email : req.body.email,
      //now in database hash of the password wiil be stored
      password : secpass
    })
    const data = {
    user:{
      id : user.id
    }
  }
 //sign is a sychronus method so no need to use await and async 
  var authtoken = jwt.sign(data,JSON_SECRET);
  console.log(authtoken);

    //as we are using async and await that why we cannot .then
  // after sucessful insertion of data we can print the below line
  success =true;
  res.json({success,authtoken});
    
  } catch (error) {
    // if there is any kind of error it will be resolved by the catch block
    console.error(error.message);
    res.status(500).send("Internal server error")
  }

})

  //Route 2 :Authenticate a user login using: Post "/api/auth/login". NO login required 
  //for this we have create a new request
  router.post('/login',[
    body('email').isEmail(),
    // .exits() means it should be something 
    body('password').exists()
  ],async(req,res)=>{
   let success = false ;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
    // get the email and password in the body whatever we entered
    const {email,password} = req.body;
    try {
      // if the email is uncorrect
    let user = await User.findOne({email})
  if(!user){
    success = false ;

    return res.status(400).json({success,error:"Please enter  valid credentials"})
  }
  // compare the eneterd password and user actual password 
  const passwordCompare  = await bcrypt.compare(password,user.password);
    
  //if the password is wrong
  if(!passwordCompare){
    success = false ;
    return res.status(400).json({success,error:"Please enter  valid credentials"})
  }

  // if both email and password are corret then do the following 
  // the following proccess is now same as the sign up next processs
  const data = {
    user:{
      id : user.id
    }
  }
 //sign is a sychronus method so no need to use await and async 
  var authtoken = jwt.sign(data,JSON_SECRET);
  success = true;
  console.log(authtoken);

    //as we are using async and await that why we cannot .then
  // after sucessful insertion of data we can print the below line
  res.json({success,authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
    }
})

//Router 3 : get login details using  Post "/api/auth/getuser". NO login required 

router.post('/getuser',fetchuser,async(req,res)=>{
  try{ userId = req.user.id;
    // find user by id (i.e., userID) and then get all data releted to that id from database except password so we use ("-password")
    const user =  await User.findById(userId).select("-password")
    // by using following line we get our user in response
    res.send(user)
  }
 catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
 }
})
 

module.exports = router;
