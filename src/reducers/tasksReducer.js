import * as tasksTypes from "../actions/tasks";

function tasks(state = [], action) {
  switch (action.type) {
    case tasksTypes.GET_TASKS_FROM_STORAGE:
      return action.payload;
    case tasksTypes.ADD_TASK:
      return [...state, action.payload];
    case tasksTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);
    case tasksTypes.UPDATE_TASK:
      return state.map((task) => {
        return task.id !== action.payload
          ? task
          : { ...task, done: !task.done };
      });
    case tasksTypes.REMOVE_COMPLETED_TASKS:
      return state.filter((task) => !task.done);
    default:
      return state;
  }
}

export default tasks;
