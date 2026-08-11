import { getModel } from "../config/llmModels.js"

export const router = async (state) => {
    const llm = await getModel("router");
    const prompt = `
    You are an agent router

    Available agents:

    -chat 
    -search
    -coding
    -pdf
    -ppt
    -vision

    Rules:
    chat:
    General conversarion,
    explanation,
    learning,
    questions.

    search:
    Current events,
    latest information,
    news,
    recent developments,
    internet lookup.

    coding:
    Generate code,
    debug code,
    build projects,
    architecture,
    API design.

    pdf:
    Questions about generate pdfs or document context.

    ppt:
    Questions about generate ppts or ppt context.

    vision:
    Generate image,
    create image

    Return ONLY one word:

    chat 
    search
    coding
    pdf
    ppt
    vision

    User query:


    `
}