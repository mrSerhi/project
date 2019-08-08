export const saveUsersToStorage = (users = []) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const saveAuthUserToStorage = (user = {}) => {
  localStorage.setItem("isAuth", JSON.stringify(user));
};

export const getUsersDataFromStorage = () => ({
  users: JSON.parse(localStorage.getItem("users")),
  isAuth: JSON.parse(localStorage.getItem("isAuth"))
});

export const updateTasksInStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
