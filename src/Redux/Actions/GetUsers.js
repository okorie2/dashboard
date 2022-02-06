import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  GET_USER_BY_ID,
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

const getUserById = (userId) => ({
  type: GET_USER_BY_ID,
  payload: userId,
});

export const handleGetUsers = () => async (dispatch) => {
  dispatch(getUsers());
  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data`
    );
    dispatch(getUsersSuccess(data));
  } catch (error) {
    dispatch(getUsersError(error));
  }
};

export const handleGetUserById = (id) => async (dispatch) => {
  dispatch(getUsers());
  try {
    const { data } = await axios.get(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${id}`
    );
    dispatch(getUserById(data));
  } catch (error) {
    dispatch(getUsersError(error));
  }
};
