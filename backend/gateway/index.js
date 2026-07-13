import express from "express"
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT 

const app = express()

app.get("/",(req , res)=>{
    res.status(200).json({message:"Gateway server running"})
})

app.listen(port,()=>{
    console.log("Server listening on port:",port)
})