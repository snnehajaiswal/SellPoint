import mongoose,{Schema} from 'mongoose';

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        reuired:true
    }
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)