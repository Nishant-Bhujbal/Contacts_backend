const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
// used to hash the password
const bcrypt = require('bcrypt')
// jwt is used to check if the credentials are correct and to give a access
// token to the user
const jwt = require('jsonwebtoken')




// @description Register the user
// @route POST /api/users/register
// @acess public

// we will not need to write try catch blocks manually, whenever there is need
// asyncHandler will manage it
const registerUsers = asyncHandler(async (req,res) => {

    console.log("hello");
    console.log("hello");
    const{username,email,password} = req.body;
    console.log(req.body);
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await Users.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registred");
    }
    // Hash password
    const hashPassword = await bcrypt.hash(password,10);
    console.log("Hashed password : ",hashPassword);
    
    const newuser = await Users.create({
        userName:username,
        email:email,
        password : hashPassword,
    });

    console.log("User is created ", newuser);

    if(newuser){
        res.status(201).json({
            _id : newuser.id,
            email : newuser.email
        })
    }
    else{
        res.status(400).json({"error": new Error("User data is not valid")});
    }
});

// @description Login the user
// @route POST /api/users/login
// @acess public

// we will not need to write try catch blocks manually, whenever there is need
// asyncHandler will manage it
const loginUsers = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('All fields are mandatory')
    }

    // use to find if user is in database
    const user = await Users.findOne({email});

    // compare password with hashpassword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                userName : user.userName,
                email : email.email,
                id : user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : "15m"
        }
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

// @description  current user
// @route POST /api/users/current
// @acess private

// we will not need to write try catch blocks manually, whenever there is need
// asyncHandler will manage it
const currentUsers = asyncHandler(async (req,res) => {
    res.json(req.user);
});

module.exports = {registerUsers , loginUsers, currentUsers};