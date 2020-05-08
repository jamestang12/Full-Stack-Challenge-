import {
  ADD_JOB,
  GET_PROGRESS,
  GET_COMPLETED,
  ERROR,
  SET_TIMEPASS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROGRESS:
      return {
        ...state,
        jobsInProcess: action.payload,
        loading: false,
      };
    case SET_TIMEPASS:
      return {
        ...state,
        timepass: action.payload,
      };

    default:
      return state;
  }
};
