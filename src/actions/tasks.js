import uuid from "uuid";

export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const GET_TASKS_FROM_STORAGE = "GET_TASKS_FROM_STORAGE";
export const REMOVE_COMPLETED_TASKS = "REMOVE_ALL_COMPLATED_TASKS";

export function addTaskAction(task) {
  return {
    type: ADD_TASK,
    id: uuid,
    payload: task
  };
}

export function removeTaskAction(id) {
  return {
    type: REMOVE_TASK,
    payload: id
  };
}

export function updateTaskAction(id) {
  return {
    type: UPDATE_TASK,
    payload: id
  };
}

export function getTasksFromStorage(tasks) {
  return {
    type: GET_TASKS_FROM_STORAGE,
    payload: tasks
  };
}
