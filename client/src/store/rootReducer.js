import { combineReducers } from "redux";

// reducers
import todo from "./task/task-reducer";
import auth from "./auth/auth-reducer";

export default combineReducers({
  todo,
  auth
});
