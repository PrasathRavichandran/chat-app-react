import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { verifyAuth } from "./actions/auth.actions";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

store.dispatch(verifyAuth());

export default store;
