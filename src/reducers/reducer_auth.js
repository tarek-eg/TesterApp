import * as type from "../actions/types";
import InitialState from "./initialState";

export default function(state = InitialState.authenticated, action) {
  switch (action.type) {
    case type.AUTH_USER:
      return { ...state, error: "", authenticated: true };
    case type.UNAUTH_USER:
      return { ...state, error: "", authenticated: false };
    case type.AUTH_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
