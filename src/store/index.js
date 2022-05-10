import { createStore } from "redux";
import reducers from "./reducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import { useDispatch } from "react-redux";

const store = createStore(reducers, composeWithDevTools());

export const dispatch = store.dispatch;
export default store;