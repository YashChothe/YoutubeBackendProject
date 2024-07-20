import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloundinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async(req,res)=>{
    // res.status(200).json({
    //     messahe:"ok"
    // })

    // get the user details from frontend
    // validation - not empty
    // check if user already exist = username ,email
    // check for images check for avatar
    // upload then to cloudinary ,avatar
    // create user object -create entry in db
    // remove password and refreshtoken from response
    // check for user creation
    // return response

     const {fullName,userName,email,password}=req.body
    //  console.log("email",email)

     if(
        [fullName,userName,email,password].some((field)=>
            field?.trim() === ""
        )
     ){
        throw new ApiError(400,"All files are required")
     }

     const existedUser =await User.findOne({
        $or:[{userName},{email}]
     })

     if (existedUser) {

         throw new ApiError(409,"user with username and email already exist")
     }

     const avatarLocalPath=req.files?.avatar[0]?.path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path;

     if (!avatarLocalPath) {
        throw new ApiError(400,"avatar file is required")
     }

    const avatar= await uploadOnCloundinary(avatarLocalPath)
    const coverImage = await uploadOnCloundinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400,"Avatar file is required")
        
    }

   const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password
    })

   const createdUser = await User.findById(user._id).select(
    " -password -refershToken"
   )

   if (!createdUser) {
    throw new ApiError(500,"somtthing went wrong while registering the user")
    
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
   )






})

export {registerUser}