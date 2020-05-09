import React, { useReducer } from "react";
import JobContext from "./jobContext";
import jobReducer from "./jobReducer";
import {
  ADD_JOB,
  GET_PROGRESS,
  GET_COMPLETED,
  ERROR,
  SET_LOADING,
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

  return (
    <JobContext.Provider
      value={{
        loading: state.loading,
        jobsInCompleted: state.jobsInCompleted,
        jobsInProcess: state.jobsInProcess,
        timepass: state.timepass,
        loading2: state.loading2,
        getJobsInProcess,
        addJobInProcess,
        setLoading,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
