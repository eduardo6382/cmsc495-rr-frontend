import {
  CHANGE_PASSWORD,
  GET_ERRORS,
  GET_SAVED_RECIPES,
  RECIPE_LOADING,
  USER_LOADED,
  USER_LOADING,
} from "./types";
import axiosInstance from "../../utils/axios";
import { tokenConfig } from "./auth";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axiosInstance
    .get("/user/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};

export const changePassword =
  (old_password, new_password) => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const body = JSON.stringify({ old_password, new_password });

    axiosInstance
      .put("/user/password/change/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: CHANGE_PASSWORD,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response,
        });
      });
  };

export const getSavedRecipes = (user_id) => (dispatch, getState) => {
  dispatch({ type: RECIPE_LOADING });

  axiosInstance
    .get(`/user/profile/${user_id}/bookmarks/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SAVED_RECIPES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};