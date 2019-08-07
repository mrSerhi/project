import uuid from "uuid";

export const SIGN_UP = "SIGN_UP";
const signUp = ({ username, email, password }) => ({
  type: SIGN_UP,
  payload: { id: uuid(), username, email, password }
});
export const signUpAndSave = ({ username, email, password }) => async (
  dispatch,
  getState
) => {
  await dispatch(signUp({ username, email, password }));
  saveUsersToStorage(getState().auth.users);
};

export const LOG_IN = "LOG_IN";
const logIn = (user) => ({
  type: LOG_IN,
  payload: user
});
export const logInAndSave = (user) => async (dispatch, getState) => {
  await dispatch(logIn(user));
  saveAuthUserToStorage(getState().auth.isAuth);
};

export const LOG_OUT = "LOG_OUT";
export const logOut = () => async (dispatch) => {
  await dispatch({ type: LOG_OUT, payload: {} });
  saveAuthUserToStorage(); //clear store
};

export const GET_AUTH_DATA_FROM_STORAGE = "GET_AUTH_DATA_FROM_STORAGE";
export const getAuthDataFromStorage = () => ({
  type: GET_AUTH_DATA_FROM_STORAGE,
  payload: {
    users: JSON.parse(localStorage.getItem("users")),
    isAuth: JSON.parse(localStorage.getItem("isAuth"))
  }
});

function saveUsersToStorage(users = []) {
  localStorage.setItem("users", JSON.stringify(users));
}

function saveAuthUserToStorage(user = {}) {
  localStorage.setItem("isAuth", JSON.stringify(user));
}
