import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {Product} from "../models/product.model.js"

const productsItem=asyncHandler(async (req,res)=>{
    console.log(req.body)
     const {name,brand,category,price}=req.body;
     if(!name || !brand || !category || !price){
        throw new ApiError('400',"All Fields are required please fill name,brand,category,price")
     }
     const productData=await Product.create({name,brand,category,price})
     if(!productData){
        throw new ApiError(400,"Product does not Add Successfully")
     }
     res
     .status(201)
     .json(
        new ApiResponse(201,productData,"Add products Successfully")
     )
})

const getAllProduct=asyncHandler(async (req,res)=>{
    const products=await Product.find()
    res
    .status(200)
    .json(
        new ApiResponse(200,products,"Successfully get the products")
    )
})

const productDelete=asyncHandler(async(req,res)=>{

   const {_id}=req.params
   const productdeleted=await Product.findByIdAndDelete(_id)
   if(!productdeleted){
      throw new ApiError(400,"Product does not delete SuccessFully")
   }
   res
   .status(200)
   .json(
      new ApiResponse(200,productdeleted,"product delete Successfully")
   )
})

const productUpdate=asyncHandler(async(req,res)=>{
   console.log(req.params)
   const {_id}=req.params
   const {name,category,brand,price}=req.body
   if(!name || !category || !brand || !price){
      throw new ApiError(400,"Required ALl Fields name,brand,category,price")
   }
   const productUpdated=await Product.findByIdAndUpdate(_id,{
      $set:{name,brand,category,price}
   },{new:true})
   if(!productUpdated){
      throw new ApiError(400,"product does not updated")
   }
   res
   .status(200)
   .json(
      new ApiResponse(200,productUpdated,"Product are updated Successfully")
   )
})

export default {productsItem,getAllProduct,productDelete,productUpdate}