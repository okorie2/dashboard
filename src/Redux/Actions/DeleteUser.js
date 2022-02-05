import { DEL_USER, DEL_USER_ERROR, DEL_USER_SUCCESS } from "./ActionTypes";

const deleteUser = () => ({
  type: DEL_USER,
});

const deleteUserSuccess = (userId) => ({
  type: DEL_USER_SUCCESS,
  payload: userId,
});

const deleteUserError = (error) => ({
  type: DEL_USER_ERROR,
  payload: error,
});

export const handleDeleteUser = (userId) => async (dispatch) => {
  dispatch(deleteUser());
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    dispatch(deleteUserSuccess(userId));
    console.log(userId, "useriddd");
  } catch (error) {
    dispatch(deleteUserError(error));
  }
};
