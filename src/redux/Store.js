
import { createStore } from "redux";
import Reduceres from "./Reduceres";
import { composeWithDevTools } from "redux-devtools-extension";
export const Box = createStore(Reduceres , composeWithDevTools())