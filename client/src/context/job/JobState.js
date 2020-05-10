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
} from "../types";
import axios from "axios";

const JobState = (props) => {
  const initialState = {
    loading: true,
    jobsInProcess: null,
    jobsInCompleted: null,
    tasks: null,
    timepass: null,
    loading2: false,
    page: "process",
    currentJob: [],
    editTask: [],
    serialNumber: [],
    jobData: [],
  };

  const [state, dispatch] = useReducer(jobReducer, initialState);

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

  const setTask = (value, serialNumber, data) => {
    dispatch({
      type: EDIT_TASK,
      payload: value,
      payload2: serialNumber,
      payload3: data,
    });
  };

  return (
    <JobContext.Provider
      value={{
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
        getJobsInProcess,
        addJobInProcess,
        setLoading,
        setPage,
        setEditJob,
        setTask,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
