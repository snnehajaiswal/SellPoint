import dotenv from "dotenv"
dotenv.config()
import  connectDB  from "./db/index.js"
import app from "./app.js"


connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is Running on the port : ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.log("MongoDB error",error)
    console.log(error)
})