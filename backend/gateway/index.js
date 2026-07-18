import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
const port = process.env.PORT 

const app = express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(cookieParser())
app.use("/auth" , proxy((process.env.AUTH_SERVICE)))

app.get("/",(req , res)=>{
    res.status(200).json({message:"Gateway server running"})
})

app.listen(port,()=>{
    console.log("Gateway server listening on port:",port)
})