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
  SAVE_LOADER,
  SAVE_UPDATE,
  SAVE_SERVERTYPE,
  UPDATE_DATE,
  UPDATE_CURRENT_ITEM,
  ADD_REMOVIE_LIST,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_REMOVIE_LIST:
      return {
        ...state,
        materialRemove: [action.payload, ...state.materialRemove],
      };
    case UPDATE_MATERIAL:
      return {
        ...state,
        materials: state.materials.map((material) =>
          material._id === action.payload._id ? action.payload : material
        ),
      };
    case SAVE_SERVERTYPE:
      return {
        ...state,
        jobDataServerTye: action.payload,
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

    case UPDATE_CURRENT_ITEM: {
      return {
        ...state,
        jobsInProcess: state.jobsInProcess.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
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
        jobDataServerTye: action.payload4,
        jobDataDate: action.payload5,
        jobDataDay: action.payload6,
      };

    case SAVE_LOADER:
      return {
        ...state,
        saveLoader: action.payload,
      };

    case UPDATE_DATE:
      return {
        ...state,
        jobDataDate: action.payload,
      };
    case SAVE_UPDATE:
      return {
        ...state,
        saveLoader: true,
      };

    default:
      return state;
  }
};
