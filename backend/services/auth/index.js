import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import router from "./routes/auth.route.js";
dotenv.config();

const port = process.env.PORT
const app = express()

app.use(express.json())

app.use("/",router)

app.get("/",(req , res)=>{
    res.status(200).json({message:"Auth server running"})
})

app.listen(port,()=>{
    console.log("Auth server is listening on port:",port)
    connectDb();
})