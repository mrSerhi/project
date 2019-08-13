import * as authTypes from "./auth-actions";

const initState = {
  users: [],
  authUser: {}
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
        authUser: action.payload
      };
    case authTypes.LOG_OUT:
      return {
        ...state,
        authUser: action.payload
      };
    case authTypes.GET_AUTH_DATA_FROM_STORAGE:
      return {
        users: action.payload.users,
        authUser: action.payload.authUser
      };
    default:
      return state;
  }
}
