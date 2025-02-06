import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
const app=express()
app.use(cors()) 

app.use(express.json())
app.use(express.static('public'));
app.use("/api/v1/users",userRouter)
app.use("/api/v1/products",productRouter)
export default app;




