import uuid from "uuid";

export const ADD_TASK = "ADD_TASK";
export const addTask = ({ title, done = false, id = uuid() }) => ({
  type: ADD_TASK,
  payload: { title, done, id }
});
export const addTaskAndSave = ({ title, done, id }) => async (
  dispatch,
  getState
) => {
  await dispatch(addTask({ title, done, id }));
  updateTasksInStorage(getState().tasks);
};

export const UPDATE_TASK = "UPDATE_TASK";
export const updateTask = (id) => ({
  type: UPDATE_TASK,
  payload: id
});

export const updateTaskAndSave = (id) => async (dispatch, getState) => {
  await dispatch(updateTask(id));
  updateTasksInStorage(getState().tasks);
};

export const REMOVE_TASK = "REMOVE_TASK";
export const removeTask = (id) => ({
  type: REMOVE_TASK,
  payload: id
});

export const CLEAR_COMPLETED_TASKS = "CLEAR_COMPLETED_TASKS";
export const clearCompletedTasks = () => ({
  type: CLEAR_COMPLETED_TASKS
});

export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const getAllTasks = () => ({
  type: GET_ALL_TASKS,
  payload: JSON.parse(localStorage.getItem("tasks")) || []
});

// for this module
function updateTasksInStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
