import {Annotation } from "@langchain/langgraph";

export const agnetState=Annotation.Root({
    prompt:Annotation(),
    aiResponse:Annotation(),
    agent:Annotation(),
    ConversationID:Annotation()
})