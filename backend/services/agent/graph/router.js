import { getModel } from "../config/llmModels.js"

export const router = async (state) => {
    const llm = await getModel("router");
    const prompt = `
    You are an agent router

    Available agents:

    -chat 
    -search
    -pdf
    -ppt
    -image

    Rules:
    chat
    `
}