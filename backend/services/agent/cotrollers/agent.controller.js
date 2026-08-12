import axios from "axios"
import {graph} from "../graph/graph.js"

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId } = req.body;
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, { conversationId: conversationId, role: "user", content: prompt })
        const result = await graph.invoke({
            prompt , 
        })
    } catch (error) {

    }
}