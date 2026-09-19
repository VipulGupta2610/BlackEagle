import api from "../../utils/axios.js"

export const updateConversation = async (paylaod)=>{
    try {
        const {data} = await api.post("/api/chat/update-conversation",paylaod)
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}