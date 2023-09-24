const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
// used to hash the password
const bcrypt = require('bcrypt')




// @description Register the user
// @route POST /api/users/register
// @acess public

// we will not need to write try catch blocks manually, whenever there is need
// asyncHandler will manage it
const registerUsers = asyncHandler(async (req,res) => {

    const{username,email,password} = req.body;
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
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({
        message : "register the user"
    })
});

// @description Login the user
// @route POST /api/users/login
// @acess public

// we will not need to write try catch blocks manually, whenever there is need
// asyncHandler will manage it
const loginUsers = asyncHandler(async (req,res) => {
    res.json({
        message : "login user"
    })
});

// @description  current user
// @route POST /api/users/current
// @acess private

// we will not need to write try catch blocks manually, whenever there is need
// asyncHandler will manage it
const currentUsers = asyncHandler(async (req,res) => {
    res.json({
        message : "current user information"
    })
});

module.exports = {registerUsers , loginUsers, currentUsers};