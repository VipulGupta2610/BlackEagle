import { StateGraph } from "@langchain/langgraph";
import { agnetState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { imageGenAgent } from "../agents/imageGen.agnet.js";

const workflow = new StateGraph(agnetState)

workflow.addNode("router" , router)
workflow.addNode("chat" , chatAgent)
workflow.addNode("search" , searchAgent)
workflow.addNode("pdf" , pdfAgent)
workflow.addNode("ppt" , pptAgent)
workflow.addNode("imageGen" ,  imageGenAgent)

workflow.addEdge("__start__" , router)
workflow.addConditionalEdges("router" , router)