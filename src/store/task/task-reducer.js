import * as taskTypes from "./task-actions";

const initState = {
  allTasks: [],
  searchTerm: "",
  visibilityFilter: "SHOW_ALL",
  filteredTasks: [],
  pagination: {}
};

export default function tasks(state = initState, action) {
  switch (action.type) {
    case taskTypes.ADD_TASK:
      return {
        ...state,
        allTasks: [...state.allTasks, action.payload]
      };
    case taskTypes.UPDATE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.map((task) => {
          return task.id !== action.payload
            ? task
            : { ...task, done: !task.done };
        })
      };
    case taskTypes.REMOVE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.filter((task) => task.id !== action.payload)
      };
    case taskTypes.GET_ALL_TASKS:
      return {
        ...state,
        allTasks: action.payload
      };
    case taskTypes.CLEAR_COMPLETED_TASKS:
      return {
        ...state,
        allTasks: state.allTasks.filter((task) => !task.done)
      };
    case taskTypes.GET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    case taskTypes.SET_TASK_FILTER:
      return {
        ...state,
        visibilityFilter: action.payload
      };
    default:
      return state;
  }
}
