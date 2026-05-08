const userModel=require("../models/user.model")
const tokenBlacklistModel=require("../models/blacklist.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken",)

/**
 * 
 *  @name:registerUserController
 *  @description:Register a new user,expects username,email and password
    @access:Public 
 */
async function registerUserController(req,res){
    const {username,email,password}=req.body

    if(!username|| !email ||!password){
        return res.status(400).json({
            message:"Please provide username, email and password"
        })
    }
    const isUserAlreadyExists=await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserAlreadyExists){
        
        return res.status(400).json({
            message:"Account already exists with this email or username"
        })
    }

    const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
        username,
        email,
        password:hash
    })

    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECERT,{expiresIn:"1d"})

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
});

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}


/**
 * 
 * @name loginUserController
 * @description login a user, expects email and passoword in the request body 
 * @access Public
 */

async function loginUserController(req,res) {
    const {email,password}=req.body;
    const user=await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or Password"
        })
    }
    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECERT,{expiresIn:"1d"})

    res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
});

    res.status(201).json({
        message:"User LoggedIn Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

/**
 * 
 * @name logoutUserController
 * @description logout the user by clearing the cookie and blacklisting the token 
 * @access
 */

async function logoutUserController(req,res) {
    const token=req.cookies.token
    if(token){
        await tokenBlacklistModel.create({token})
    }

    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
});
    
    res.status(200).json({
        message:"User Logged-Out Successfully",
    })
}


/**
 * @name getMeController
 * @description Get the details of the logged in user
 * @access Private
 */
async function getMeController(req,res){
    const user=await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User Details Feteched Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
 }



module.exports={
    registerUserController,loginUserController,logoutUserController,getMeController}