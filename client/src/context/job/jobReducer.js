import {
  ADD_JOB,
  GET_PROGRESS,
  GET_COMPLETED,
  ERROR,
  SET_PAGE,
  SET_LOADING,
  EDIT_JOB,
  EDIT_TASK,
} from "../types";

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
        ...state,
        loading: false,
        loading2: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case EDIT_JOB:
      return {
        ...state,
        currentJob: action.payload,
        loading: false,
      };
    case EDIT_TASK:
      return {
        ...state,
        editTask: action.payload,
        serialNumber: action.payload2,
        jobData: action.payload3,
      };

    default:
      return state;
  }
};
