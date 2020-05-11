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
  DELETE_CURRENT_MATERIAL,
  EDIT_MATERIAL,
  UPDATE_MATERIAL,
  ADD_MATERIAL,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case UPDATE_MATERIAL:
      return {
        ...state,
        materials: state.materials.map((material) =>
          material._id === action.payload._id ? action.payload : material
        ),
      };
    case EDIT_MATERIAL:
      return {
        ...state,
        materialCurrentState: action.payload,
      };
    case DELETE_CURRENT_MATERIAL:
      return {
        ...state,
        materials: state.materials.filter(
          (material) => material._id !== action.payload._id
        ),
        materialRemove: [action.payload, ...state.materialRemove],
      };
    case SET_MATERIALS_LOADING:
      return {
        ...state,
        materialLoader: action.payload,
      };
    case ADD_MATERIAL:
      return {
        ...state,
        materials: [action.payload, ...state.materials],
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
    case SET_MATERIALS: {
      return {
        ...state,
        materials: action.payload,
        orgMaterials: action.payload,
        materialLoader: false,
      };
    }

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
        materialRemove: [],
      };
    case EDIT_TASK:
      return {
        ...state,
        editTask: action.payload,
        serialNumber: action.payload2,
        jobData: action.payload3,
        jobDataId: action.payload3._id,
      };

    default:
      return state;
  }
};
