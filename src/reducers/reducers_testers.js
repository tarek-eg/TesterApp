import * as types from "../actions/types";
import InitialState from "./initialState";
import _ from "lodash";

export default function(state = InitialState.testers, action) {
  switch (action.type) {
    case types.FECH_TESTERS:
      return _.mapKeys(action.payload, "_id");
    case types.FETCH_TESTER:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    case types.ADD_TESTER:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    case types.UPDATE_TESTER:
      return {
        ...state,
        [action.payload._id]: action.payload
      };
    case types.DELETE_TESTER:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
