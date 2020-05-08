import {
  ADD_JOB,
  GET_PROGRESS,
  GET_COMPLETED,
  ERROR,
  GET_TASKS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROGRESS:
      return {
        ...state,
        jobsInProcess: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
