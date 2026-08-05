import { StateGraph } from "@langchain/langgraph";
import { agnetState } from "./state.js";

const graph = new StateGraph(agnetState)