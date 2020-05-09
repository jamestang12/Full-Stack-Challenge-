import {
  GET_TASKS,
  ERROR,
  ADD_CURRENT_TASK,
  SET_ID,
  DELETE_CURRENT_TASK,
  ADD_TASKS,
  SET_CURRENT_TASK,
  UPDATE_CURRENT_TASK,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    case ADD_CURRENT_TASK:
      return {
        ...state,
        currentTasks: [action.payload, ...state.currentTasks],
      };
    case SET_ID:
      return {
        ...state,
        currentId: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_CURRENT_TASK: {
      return {
        ...state,
        currentTasks: state.currentTasks.map((task) =>
          task.jobId === action.payload.jobId ? action.payload : task
        ),
      };
    }
    case DELETE_CURRENT_TASK:
      return {
        ...state,
        currentTasks: state.currentTasks.filter(
          (task) => task.jobId !== action.payload
        ),
      };
    case ADD_TASKS:
      return {
        ...state,
        currentTasks: [],
      };

    default:
      return state;
  }
};
