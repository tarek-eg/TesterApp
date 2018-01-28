import axios from "axios";
import { push } from "react-router-redux";
import * as types from "./types";
import toastr from "toastr";

const ROOT_URL = "http://localhost:3090";

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: types.AUTH_USER });
        localStorage.setItem("token", response.data.token);
        dispatch(push("/"));
        toastr.success("Signed in");
      })
      .catch(error => {
        dispatch(authError("Bad login info"));
      });
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: types.AUTH_USER });
        localStorage.setItem("token", response.data.token);
        dispatch(push("/"));
        toastr.success("Signed Up");
      })
      .catch(error => {
        dispatch(authError("Bad signup"));
      });
  };
}

export function signoutUser() {
  localStorage.removeItem("token");
  toastr.success("Signed Out");
  return {
    type: types.UNAUTH_USER
  };
}

export function fetchTesters() {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/testers`, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(res => {
        dispatch({ type: types.FECH_TESTERS, payload: res.data });
      })
      .catch(err => {
        dispatch(authError(err.response));
      });
  };
}

export function addTester(values, callBack) {
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/tester`, values, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(res => {
        dispatch({ type: types.ADD_TESTER, payload: res.data.tester });
        toastr.success("Tester Added: " + values.name);
      })
      .then(() => callBack())
      .catch(err => {
        dispatch(testerError(err.response.data.error));
      });
  };
}

export function updateTester(id, values, callBack) {
  return function(dispatch) {
    axios
      .put(`${ROOT_URL}/tester/${id}`, values, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(res => {
        dispatch({ type: types.UPDATE_TESTER, payload: res.data.tester });
        toastr.success("Tester Updated: " + values.name);
      })
      .then(() => callBack())
      .catch(err => {
        if (err.response) {
          dispatch(testerError(err.response.data.error));
        } else {
          dispatch(testerError("Error updating"));
        }
      });
  };
}

export function fetchTester(id, callBack) {
  return function(dispatch) {
    axios
      .get(`${ROOT_URL}/tester/${id}`, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(res => {
        dispatch({
          type: types.FETCH_TESTER,
          payload: res.data
        });
      })
      .then(() => callBack())
      .catch(err => {
        dispatch(testerError(err));
      });
  };
}

export function deleteTester(id, callBack) {
  return function(dispatch) {
    axios
      .delete(`${ROOT_URL}/tester/${id}`, {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(res => {
        dispatch({ type: types.DELETE_TESTER, payload: id });
        toastr.success("Tester deleted");
      })
      .then(() => callBack())
      .catch(err => {
        dispatch(testerError(err));
      });
  };
}

export function testerError(error) {
  toastr.warning(error);
  return {
    type: types.TESTER_ERROR,
    payload: error
  };
}

export function authError(error) {
  toastr.warning(error);
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}
