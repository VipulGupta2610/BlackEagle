import mongoose from "mongoose"

const connectDb = async (req , res)=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected")
    } catch (error) {
        console.log("DB error")
        console.log(error)
    }
}

export default connectDb