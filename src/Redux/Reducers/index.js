import { userReducer } from "./User";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ users: userReducer });
