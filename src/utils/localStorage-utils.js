export const saveUsersToStorage = (users = []) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const saveAuthUserToStorage = (user = {}) => {
  localStorage.setItem("authUser", JSON.stringify(user));
};

export const getUsersDataFromStorage = () => ({
  users: JSON.parse(localStorage.getItem("users")) || [],
  authUser: JSON.parse(localStorage.getItem("authUser")) || {}
});

export const saveTasksInStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
