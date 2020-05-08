import { ADD_JOB, GET_PROGRESS, GET_COMPLETED, ERROR } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROGRESS:
      return {
        ...state,
        jobsInProcess: action.payload,
        loading: false,
      };
    case ADD_JOB:
      return {
        state,
      };

    default:
      return state;
  }
};
