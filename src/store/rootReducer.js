import { combineReducers } from "redux";

// reducers
import tasks from "./task/task-reducer";
import auth from "./auth/auth-reducer";

export default combineReducers({
  tasks,
  auth
});
