import * as taskTypes from "./task-actions";

const initState = {
  tasks: [],
  searchTerm: "",
  visibilityFilter: "SHOW_ALL",
  pagination: {}
};

export default function todo(state = initState, action) {
  switch (action.type) {
    case taskTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case taskTypes.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          return task.id !== action.payload
            ? task
            : { ...task, done: !task.done };
        })
      };
    case taskTypes.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload)
      };
    case taskTypes.GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case taskTypes.CLEAR_COMPLETED_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.done)
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
