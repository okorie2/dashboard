import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_USER_SUCCESS,
  DEL_USER,
  DEL_USER_ERROR,
  DEL_USER_SUCCESS,
  EDIT_USER,
  EDIT_USER_ERROR,
  EDIT_USER_SUCCESS,
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  GET_USER_BY_ID,
} from "../Actions/ActionTypes";

const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        loading: true,
      };

    case ADD_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.concat(action.payload),
      };

    case DEL_USER:
      return {
        ...state,
        loading: true,
      };

    case DEL_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DEL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id != action.payload),
      };
    case EDIT_USER:
      return {
        ...state,
        loading: true,
      };

    case EDIT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_USER_SUCCESS:
      var userList = state.users;
      userList[action.id - 1] = action.payload;
      return {
        ...state,
        loading: false,
        users: userList,
      };

    default:
      return state;
  }
};
