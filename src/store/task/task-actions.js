export const ADD_TASK = "ADD_TASK";
export const addTask = (task) => ({
  type: ADD_TASK,
  task
});

export const UPDATE_TASK = "UPDATE_TASK";
export const updateTask = (id) => ({
  type: UPDATE_TASK,
  id
});

export const REMOVE_TASK = "REMOVE_TASK";
export const removeTask = (id) => ({
  type: REMOVE_TASK,
  id
});

export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const getAllTasks = () => (dispatch) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return dispatch({ type: GET_ALL_TASKS, tasks });
};
