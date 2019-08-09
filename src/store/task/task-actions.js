import uuid from "uuid";
import { saveTasksInStorage } from "../../utils/localStorage-utils";

export const ADD_TASK = "ADD_TASK";
const addTask = ({ title, done = false }) => ({
  type: ADD_TASK,
  payload: { title, done, id: uuid() }
});
export const addTaskAndSave = ({ title, done, id }) => async (
  dispatch,
  getState
) => {
  await dispatch(addTask({ title, done, id }));
  saveTasksInStorage(getState().todo.tasks);
};

export const UPDATE_TASK = "UPDATE_TASK";
const updateTask = (id) => ({
  type: UPDATE_TASK,
  payload: id
});
export const updateTaskAndSave = (id) => async (dispatch, getState) => {
  await dispatch(updateTask(id));
  saveTasksInStorage(getState().todo.tasks);
};

export const REMOVE_TASK = "REMOVE_TASK";
const removeTask = (id) => ({
  type: REMOVE_TASK,
  payload: id
});
export const removeTaskAndSave = (id) => async (dispatch, getState) => {
  await dispatch(removeTask(id));
  saveTasksInStorage(getState().todo.tasks);
};

export const CLEAR_COMPLETED_TASKS = "CLEAR_COMPLETED_TASKS";
const clearCompletedTasks = () => ({
  type: CLEAR_COMPLETED_TASKS
});
export const clearCompletedTasksAndSave = () => async (dispatch, getState) => {
  await dispatch(clearCompletedTasks());
  saveTasksInStorage(getState().todo.tasks);
};

export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const getAllTasks = () => ({
  type: GET_ALL_TASKS,
  payload: JSON.parse(localStorage.getItem("tasks")) || []
});

export const GET_SEARCH_TERM = "GET_SEARCH_TERM";
export const getSearchTerm = (searchTerm) => ({
  type: GET_SEARCH_TERM,
  payload: searchTerm
});

export const SET_TASK_FILTER = "SET_TASK_FILTER";
export const setTaskFilter = (filter) => ({
  type: SET_TASK_FILTER,
  payload: filter
});

export const GET_CURRENT_PAGE = "GET_CURRENT_PAGE";
export const getCurrentPage = (page) => ({
  type: GET_CURRENT_PAGE,
  payload: page
});
