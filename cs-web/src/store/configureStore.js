import { createStore, combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";

export default createStore(
  combineReducers({
    authReducer,
    categoryReducer,
  })
);
