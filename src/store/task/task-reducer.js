import * as taskTypes from "./task-actions";

export default function tasks(state = [], action) {
  switch (action.type) {
    case taskTypes.ADD_TASK:
      return [...state, action.task];
    case taskTypes.UPDATE_TASK:
      return state.map((task) => {
        return task.id !== action.id ? task : { ...task, done: !task.done };
      });
    case taskTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== action.id);
    case taskTypes.GET_ALL_TASKS:
      return action.tasks;
    default:
      return state;
  }
}
