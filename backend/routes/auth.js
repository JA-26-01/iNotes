const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User= require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser =  require('../middleware/fetchUser')

const JWT_SECRET= "Jesmine is a good girl";

//Creating a user using: POST "/api/auth/". Login not required
router.post('/createuser',[
    body('email',"Email is invalid").isEmail(),
    body('name',"Enter a valid name").isLength({min:3}),
    body('password',"Password is not valid").isLength({min:7})
],
async (req,res)=>
{
    const errors = validationResult(req);
    //If errors are present, bad request
    if (!errors.isEmpty()) 
    {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    let success=false;

    //check whether the user exists already
    try{
    let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({success,error: "User already exists"});
    }

   const salt=await bcrypt.genSalt(10);
   const secPass =await bcrypt.hash(req.body.password,salt);

    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data = 
      {
        user:
        {
          id: user.id
        }
      }
      
      const jwt_token = jwt.sign(data,JWT_SECRET);
      console.log(jwt_token)
      
      // .then(user => res.json(user))
      // .catch(err=>res.json({error: "User already exists"}));
      // res.json(user)
      success = true;
      res.json({success,jwt_token})
    }
    catch(error)
    {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }

})

//Letting a user log in using: POST "/api/auth/". Login not required
router.post('/login',[
    body('email',"Email is invalid").isEmail(),
    body('password',"Password cannot be blank").exists()
],
async(req,res)=>
{
  const errors = validationResult(req);
  //If errors are present, bad request
  if (!errors.isEmpty()) 
  {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  let success=false

  const {email,password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user)
      return res.status(400).json({error:"Please enter correct credentials"});

    const compare_pass=await bcrypt.compare(password,user.password);
    if(!compare_pass)
      return res.status(400).json({success,error:"Please enter correct credentials"});

      const data = 
      {
        user:
        {
          id: user.id
        }
      }
      
      const jwt_token = jwt.sign(data,JWT_SECRET);
      console.log(jwt_token);
      success=true
      res.json({success,jwt_token});

    }
    catch(error)
    {
      console.log(error.message);
      res.status(500).send("Some error occured. Please try again after some time");
    }

})

//Get user details using : POST "/api/auth/login". Login required

router.post('/getdetails',fetchuser,async(req,res)=>
{
try{
  const userId = req.user.id;
  let user = await User.findById(userId).select("-password");
  res.send(user)
  }
  catch(error)
  {
    console.log(error.message);
    res.status(500).send("Some error occured. Please try again after some time");
  }

})


module.exports= router