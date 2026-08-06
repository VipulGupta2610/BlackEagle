import { StateGraph } from "@langchain/langgraph";
import { agnetState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageGenAgent, vision } from "../agents/vision.agent.js";
import { codingAgent } from "../agents/coding.agent.js";

const workflow = new StateGraph(agnetState)

workflow.addNode("router" , router)
workflow.addNode("chat" , chatAgent)
workflow.addNode("search" , searchAgent)
workflow.addNode("coding" , codingAgent)
workflow.addNode("pdf" , pdfAgent)
workflow.addNode("ppt" , pptAgent)
workflow.addNode("vision" ,  visionAgent)

workflow.addEdge("__start__" , router)
workflow.addConditionalEdges("router" , (state)=>{
    switch (state.agent) {
        case "chat":
            return "chat";
        case "search":
            return "search";
        case "coding":
            return "coding";
        case "pdf":
            return "pdf";
        case "ppt":
            return "ppt";
        case "vision":
            return "vision";
    
        default:
            return "chat";
    }
})