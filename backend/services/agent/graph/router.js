import { getModel } from "../config/llmModels.js"

export const router = async (state) => {
    const llm = await getModel("router");
    const prompt = 
}