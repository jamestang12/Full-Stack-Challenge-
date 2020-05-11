import React, { useReducer } from "react";
import JobContext from "./jobContext";
import jobReducer from "./jobReducer";
import {
  ADD_JOB,
  GET_PROGRESS,
  GET_COMPLETED,
  ERROR,
  SET_LOADING,
  SET_PAGE,
  EDIT_JOB,
  EDIT_TASK,
  CLEAR_JOB_EDIT_STATE,
  COMPLETED_LOADING,
  SET_MATERIALS,
  SET_MATERIALS_LOADING,
  DELETE_CURRENT_MATERIAL,
  EDIT_MATERIAL,
  UPDATE_MATERIAL,
  ADD_MATERIAL,
} from "../types";
import axios from "axios";

const JobState = (props) => {
  const initialState = {
    loading: true,
    jobsInProcess: null,
    jobsInCompleted: [],
    tasks: null,
    timepass: null,
    loading2: false,
    page: "process",
    currentJob: [],
    editTask: [],
    serialNumber: [],
    jobData: [],
    loading3: true,
    materialLoader: true,
    orgMaterials: [],
    materials: [],
    materialRemove: [],
    materialCurrentState: [],
    jobDataId: null,
  };

  const [state, dispatch] = useReducer(jobReducer, initialState);

  //Delete current material
  const deleteCurrentMaterial = (value) => {
    dispatch({
      type: DELETE_CURRENT_MATERIAL,
      payload: value,
    });
  };

  //Add material to current material state
  const addCurrentMaterial = (value) => {
    dispatch({
      type: ADD_MATERIAL,
      payload: value,
    });
  };

  //Get jobs in process
  const getJobsInProcess = async () => {
    try {
      const res = await axios.get("/api/jobs/inProcess");
      dispatch({
        type: GET_PROGRESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Set material loader
  const setMaterialLoader = (value) => {
    dispatch({
      type: SET_MATERIALS_LOADING,
      payload: value,
    });
  };

  //Set materials
  const setMaterials = async (id) => {
    try {
      const res = await axios.get(`/api/materials/${id}`);
      dispatch({
        type: SET_MATERIALS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  const setCompleteLoader = (value) => {
    dispatch({
      type: COMPLETED_LOADING,
      payload: value,
    });
  };

  //Get jobs that are completed
  const getCompletedJobs = async () => {
    try {
      const res = await axios.get("/api/jobs/completed");
      dispatch({
        type: GET_COMPLETED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Update material current state
  const updateCurrentMaterial = (value) => {
    dispatch({
      type: UPDATE_MATERIAL,
      payload: value,
    });
  };

  //Set loading
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
  };

  //Set job edit state
  const setEditJob = async (id) => {
    try {
      const res = await axios.get(`/api/jobs/${id}`);
      dispatch({
        type: EDIT_JOB,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Set page
  const setPage = (value) => {
    dispatch({
      type: SET_PAGE,
      payload: value,
    });
  };

  //Add job in process
  const addJobInProcess = async (value) => {
    const config = {
      headers: {
        "Contact-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/jobs", value, config);
      dispatch({
        type: ADD_JOB,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  const clearState = (id) => {
    if (state.currentJob.length === 0) {
      dispatch({
        type: CLEAR_JOB_EDIT_STATE,
      });
    }

    if (state.currentJob._id !== id) {
      dispatch({
        type: CLEAR_JOB_EDIT_STATE,
      });
    }
  };

  const setTask = (value, serialNumber, data) => {
    dispatch({
      type: EDIT_TASK,
      payload: value,
      payload2: serialNumber,
      payload3: data,
    });
  };

  const setCurrentMaterial = (value) => {
    dispatch({
      type: EDIT_MATERIAL,
      payload: value,
    });
  };

  return (
    <JobContext.Provider
      value={{
        jobDataId: state.jobDataId,
        orgMaterials: state.orgMaterials,
        materialRemove: state.materialRemove,
        materialLoader: state.materialLoader,
        materials: state.materials,
        loading: state.loading,
        jobsInCompleted: state.jobsInCompleted,
        jobsInProcess: state.jobsInProcess,
        timepass: state.timepass,
        loading2: state.loading2,
        page: state.page,
        currentJob: state.currentJob,
        editTask: state.editTask,
        serialNumber: state.serialNumber,
        jobData: state.jobData,
        loading3: state.loading3,
        materialCurrentState: state.materialCurrentState,
        getJobsInProcess,
        getCompletedJobs,
        setLoading,
        setPage,
        setEditJob,
        setTask,
        clearState,
        setCompleteLoader,
        setMaterials,
        setMaterialLoader,
        deleteCurrentMaterial,
        addCurrentMaterial,
        setCurrentMaterial,
        updateCurrentMaterial,
        addJobInProcess,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
