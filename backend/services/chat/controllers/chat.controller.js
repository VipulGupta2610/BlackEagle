import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

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
        const conversations = await Conversation.find({
            userId:userId
        }).sort({updatedAt:-1})
        return res.status(200).json(conversations)
    } catch (error) {
        return res.status(500).json({message:"Get conversation error" , error})
    }
}

export const saveMessage = async (req , res)=>{
    try {
        const {conversationId,role,content} = req.body;
        const Message= await Message.create({
            conversationId,content,role
        })
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({message:"save message error" , error})
    }
}