import ApiError from "../utils/ApiError.js";
import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js";

   //Register Steps
   //get the user detail from the frontend
   //validation :-not empty
   //Check user is already exists : username,email
   //create new user entry in the database
   //Remove the password from the responce and check if the user is creted or not
   //send the responce with the createdUser
  
const registerUser=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const {username,email,password,fullName}=req.body;
    // if([username,email,password,fullname.firstname,fullname.lastname].some((field)=>field?.trim()==="")){
    //     throw new ApiError(400,"All fields are required")
    // }
    if(!username || !password || !email || !fullName.firstname || !fullName.lastname){
        throw new ApiError(400,"All Fields are required")
    }
    const checkExists= await User.findOne({
        $or:[{email},{username}]
    })
    if(checkExists){
      throw new ApiError(409,"User with email or username are already exists")
    }

    const user=await User.create({
        fullName:{
          firstname:fullName.firstname,
          lastname:fullName.lastname,
        },
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser=await User.findById(user._id).select("-password")
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
   
    return res.status(201).json(new ApiResponse(201,createdUser,"User Register Successfully"))
})


const loginUser=asyncHandler(async(req,res)=>{
  //Get the data from the frontend
  //validate the data username or email
  //   user exist or Not
  //password check
  //LogedInUser
  //send response
  const {username,email,password}=req.body;
  //validate
  if(!email && !username){
    throw new ApiError(400,"email or username is required")
  }
  //user
  const user=await User.findOne({
   $or:[{email},{username}]
  })
  //userexist or not
  if(!user){
    throw new ApiError(404,"user does not exists")
  }
  //password ckeck
  const isPasswordValid=await user.isPasswordCorrect(password)
  if(!isPasswordValid){
    throw new ApiError(401,"Invalid user creadentials")
  }

  const loggedInUser=await User.findById(user._id).select("-password")
  return res 
  .status(200)
  .json(
    new ApiResponse(200,{user:loggedInUser},"User logged In Successfully"))

})

export default {registerUser,loginUser}