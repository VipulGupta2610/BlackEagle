import Conversation from "../models/conversation.model.js"

export const createConversation = async (req , res)=>{
    try {
        const userId = req.headers["x-user-id"]
        console.log(userId)
        const conversation = await Conversation.create({
            userId:userId
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:"Create conversation error" , error})
    }
}

export const getConversation = async (req , res)=>{
    try {
        const userId = req.headers["x-user-id"]
        console.log(userId)
        const conversation = await Conversation.find({
            userId:userId
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:"Get conversation error" , error})
    }
}