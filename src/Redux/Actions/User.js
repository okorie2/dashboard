import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
} from "./ActionTypes";
import axios from "axios";
const getUsers = () => ({
  type: GET_USERS,
});

const getUsersSuccess = (users) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
});

const getUsersError = (error) => ({
  type: GET_USERS_ERROR,
  payload: error,
});

const addUser = () => ({
  type: ADD_USER,
});

const addUserSuccess = (userData) => ({
  type: ADD_USER_SUCCESS,
  payload: userData,
});

const addUserError = (error) => ({
  type: ADD_USER_ERROR,
  payload: error,
});

export const handleGetUsers = () => async (dispatch) => {
  dispatch(getUsers());
  try {
    const { data } = await axios.get(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
    );
    dispatch(getUsersSuccess(data));
  } catch (error) {
    dispatch(getUsersError(error));
  }
};

export const handleAddUSer = (body) => async (dispatch) => {
  dispatch(addUser());
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    console.log(body, "action");

    dispatch(addUserSuccess(data));
  } catch (error) {
    dispatch(addUserError(error));
  }
};
