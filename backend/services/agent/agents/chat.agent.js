import { getModel } from "../config/llmModels.js"

export const chatAgent = async (state) => {
    const llm = await getModel("chat")
    const systemprompt = `
    You are BlackEagleAI , an intelligent AI Assistant.

    Formatting:

   Use # for titles and ## for sections. 

    `
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