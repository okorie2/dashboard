import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../Reducers/index";

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
export default Store;
