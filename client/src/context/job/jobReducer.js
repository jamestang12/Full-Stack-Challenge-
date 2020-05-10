import {
  ADD_JOB,
  GET_PROGRESS,
  GET_COMPLETED,
  ERROR,
  SET_PAGE,
  SET_LOADING,
  EDIT_JOB,
  EDIT_TASK,
  COMPLETED_LOADING,
  SET_MATERIALS,
  SET_MATERIALS_LOADING,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_MATERIALS_LOADING:
      return {
        ...state,
        materialLoader: action.payload,
      };
    case COMPLETED_LOADING:
      return {
        ...state,
        loading3: true,
      };
    case GET_COMPLETED:
      return {
        ...state,
        loading3: false,
        jobsInCompleted: action.payload,
      };
    case SET_MATERIALS:
      {
        return {
          ...state,
          materials: action.payload,
          materialLoader: false,
        };
      }
      return {
        ...state,
        jobsInCompleted: action.payload,
        loading3: false,
      };
    case GET_PROGRESS:
      return {
        ...state,
        jobsInProcess: action.payload,
        loading: false,
      };
    case ERROR:
      return {
        state,
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
