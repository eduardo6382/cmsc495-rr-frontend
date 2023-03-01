import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_ERRORS,
  CLEAR_MESSAGE,
} from "./types";
import axiosInstance from "../../utils/axios";

export const register =
  ({ username, password, confirmPassword }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password === confirmPassword) {
      const body = JSON.stringify({
        username,
        password,
      });

      axiosInstance
        .post("/auth/register", body, config)
        .then((res) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
          dispatch({
            type: CLEAR_MESSAGE,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response,
          });
          dispatch({
            type: REGISTER_FAIL,
          });
        });
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: {
          data: { password: ["Passwords Must Match"] },
          status: null,
        },
      });
    }
  };

export const login =
  ({ username, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ username, password });

    axiosInstance
      .post("/auth/login", body, config)
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CLEAR_MESSAGE,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response,
        });
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

export const logout =
  () =>
  (dispatch, getState) => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
  };

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token.access}`;
  }

  return config;
};
