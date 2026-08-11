import { getModel } from "../config/llmModels"

export const chatAgent = async (state) => {
    const llm = await getModel("chat")
    const systemprompt = "You are BlackEagleAI , an intelligent AI Assistant"
    const response = await llm.invoke([{
        "role": "system",
        "content": systemprompt,

    },
    {
        "role": "human",
        "content": state.prompt
    }
    ])
    return { ...state, aiResponse: response.content }
}