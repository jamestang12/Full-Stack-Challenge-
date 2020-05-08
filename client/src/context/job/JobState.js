import React, { useReducer } from "react";
import JobContext from "./jobContext";
import jobReducer from "./jobReducer";
import {
  ADD_JOB,
  GET_PROGRESS,
  GET_COMPLETED,
  ERROR,
  SET_TIMEPASS,
} from "../types";
import axios from "axios";

const JobState = (props) => {
  const initialState = {
    loading: true,
    jobsInProcess: null,
    jobsInCompleted: null,
    tasks: null,
    timepass: null,
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

  //Set timepass
  const setTimePass = (value) => {
    dispatch({
      type: SET_TIMEPASS,
      payload: value,
    });
  };

  return (
    <JobContext.Provider
      value={{
        loading: state.loading,
        jobsInCompleted: state.jobsInCompleted,
        jobsInProcess: state.jobsInProcess,
        timepass: state.timepass,
        getJobsInProcess,
        setTimePass,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
