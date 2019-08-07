import * as authTypes from "./auth-actions";

const initState = {
  users: [],
  isAuth: {}
};

export default function auth(state = initState, action) {
  switch (action.type) {
    case authTypes.SIGN_UP:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case authTypes.LOG_IN:
      return {
        ...state,
        isAuth: action.payload
      };
    case authTypes.LOG_OUT:
      return {
        ...state,
        isAuth: action.payload
      };
    case authTypes.GET_AUTH_DATA_FROM_STORAGE:
      return {
        users: action.payload.users,
        isAuth: action.payload.isAuth
      };
    default:
      return state;
  }
}
