import { createSelector } from "reselect";

const getSearchTerm = (state) => state.todo.searchTerm;
const getTasks = (state) => state.todo.tasks;

export const getFilteredTasksBySearchTerm = createSelector(
  [getTasks, getSearchTerm],
  (tasks, searchTerm) => tasks.filter((task) => task.title.includes(searchTerm))
);

const getFilter = (state) => state.todo.visibilityFilter;
export const getFilteredTasksByFilter = createSelector(
  [getFilteredTasksBySearchTerm, getFilter],
  (tasks, filter) => {
    switch (filter) {
      case "SHOW_ALL":
        return tasks;
      case "SHOW_ACTIVE":
        return tasks.filter((task) => !task.done);
      case "SHOW_COMPLETED":
        return tasks.filter((task) => task.done);
      default:
        throw new Error("filter is not found");
    }
  }
);
