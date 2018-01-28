import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./reducer_auth";
import testers from "./reducers_testers";
import { routerReducer } from "react-router-redux";

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  form: formReducer,
  testers
});

export default rootReducer;
