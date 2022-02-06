import { EDIT_USER, EDIT_USER_ERROR, EDIT_USER_SUCCESS } from "./ActionTypes";

const editUser = () => ({
  type: EDIT_USER,
});

const editUserSuccess = (userData, userId) => ({
  type: EDIT_USER_SUCCESS,
  payload: userData,
  id: userId,
});

const editUserError = (error) => ({
  type: EDIT_USER_ERROR,
  payload: error,
});

export const handleEditUSer = (userId, body) => async (dispatch) => {
  dispatch(editUser());
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${userId}`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    console.log(body, "action");

    dispatch(editUserSuccess(data, userId));
  } catch (error) {
    dispatch(editUserError(error));
  }
};
