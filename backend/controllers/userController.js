import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from '../utils/createToken.js';

// Register user
const createUser = asyncHandler(async(req, res) =>{

    // taking the data from the user
    const {username, email, password} = req.body;
    
    // Validating the data provided by the user
    if(!username || !email || !password){
        throw new Error("Please fill all the inputs.");
    }

    // Checking for existing user 
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).send("User already exists")
    }
    
    // To protect user crediential using bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Now create user instance
    const newUser = new User({username, email, password: hashedPassword });
    try{
       const user =  await newUser.save()
       createToken(res, user._id); // JWT Token 
       res.status(201).json({"User created successfully" : user})

    }catch(err){
        res.status(400)
        throw new Error("Invalid User data")
    }

});

// To Login User
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email})

    if(existingUser){
        const isValidPassword = await bcrypt.compare(password, existingUser.password)

        if(isValidPassword){
            createToken(res, existingUser._id)
            res.status(200).json({"User logged In": existingUser})
        }
        return;
    }
    
});


//  Logout Current User
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message: "Logged Lot successfully"})

});


// Get All the User

const getAllUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json(users)
});


// Get Specific user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }else{
        res.status(404);
        throw new Error("User Not found.")
    }

});


//  Update User Profile
const updateUserProfile = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }


        const updatedUser = await user.save();

        res.json({"user updated successfully": updatedUser})
    }
    else{
        res.status(404);
        throw new Error("User not found")
    }
});




// ADMIN site controllers
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error("Cannot delete admin user")
        }
        await User.deleteOne({_id: user._id});
        res.json({message: "User removed"});
    }
    else{
        res.status(404);
        throw new Error("user not found")
    }
});


// Get User by ID
const getUserById = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

// Update the user by Id
const updateUserById = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.username = req.body.username || req.username
        user.email = req.body.email || req.email
        user.isAdmin = Boolean(req.body.isAdmin)


        const updatedUser = await user.save();

        res.json({message: "user updated", updatedUser})
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
});



export {createUser, loginUser, logoutUser, getAllUsers, getUserProfile, updateUserProfile,
    deleteUserById, getUserById, updateUserById
};