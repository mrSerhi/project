import * as taskTypes from "./task-actions";

export default function tasks(state = [], action) {
  switch (action.type) {
    case taskTypes.ADD_TASK:
      return [...state, action.payload];
    case taskTypes.UPDATE_TASK:
      return state.map((task) => {
        return task.id !== action.payload
          ? task
          : { ...task, done: !task.done };
      });
    case taskTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case taskTypes.GET_ALL_TASKS:
      return action.payload;
    case taskTypes.CLEAR_COMPLETED_TASKS:
      return state.filter((task) => !task.done);
    default:
      return state;
  }
}
