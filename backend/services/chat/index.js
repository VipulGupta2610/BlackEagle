import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import router from "./routes/chat.routes.js";
dotenv.config();

const port = process.env.PORT
const app = express()

app.use(express.json())
app.use("/" , router)

app.get("/",(req , res)=>{
    res.status(200).json({message:"Chat server running"})
})

app.listen(port,()=>{
    console.log("Chat server is listening on port:",port)
    connectDb();
})