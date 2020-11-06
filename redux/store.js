import {combineReducers, compose, createStore} from "redux";
import {appReducer} from "./appReducer";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    app: appReducer
})

export const store = createStore(rootReducer, compose(
    composeWithDevTools() ? composeWithDevTools() : f => f
))