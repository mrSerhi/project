import {
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  GET_TASKS_FROM_STORAGE,
  REMOVE_ALL_COMPLETED_TASKS
} from "../actions/tasks";

function tasks(state = [], action) {
  switch (action.type) {
    case GET_TASKS_FROM_STORAGE:
      return action.payload;
    case ADD_TASK:
      return [...state, action.payload];
    case REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case UPDATE_TASK:
      return state.map((task) => {
        return task.id !== action.payload
          ? task
          : { ...task, done: !task.done };
      });
    case REMOVE_ALL_COMPLETED_TASKS:
      return state.filter((task) => !task.done);
    default:
      return state;
  }
}

export default tasks;
