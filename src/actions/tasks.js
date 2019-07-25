import uuid from "uuid";

export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const GET_TASKS_FROM_STORAGE = "GET_TASKS_FROM_STORAGE";
export const REMOVE_COMPLETED_TASKS = "REMOVE_COMPLETED_TASKS";

export const addTaskAction = (task) => ({
  type: ADD_TASK,
  payload: { id: uuid(), ...task }
});

export const removeTaskAction = (id) => ({
  type: REMOVE_TASK,
  payload: id
});

export const updateTaskAction = (id) => ({
  type: UPDATE_TASK,
  payload: id
});

export const getTasksFromStorage = (tasks) => ({
  type: GET_TASKS_FROM_STORAGE,
  payload: tasks
});

export const removeCompletedTasks = () => ({
  type: REMOVE_COMPLETED_TASKS
});
