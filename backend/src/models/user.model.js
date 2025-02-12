import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt'
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    fullName:{
        firstname:{
            type:String,
            required:true,
            lowercase:true,
        },
        lastname:{
            type:String,
            required:true,
            lowercase:true,
        }
    }
},{timestamps:true})
//Incript the password
userSchema.pre('save',async function(next){
 if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,10)
     next();
})
//decript the password
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

export const User=mongoose.model("User",userSchema)