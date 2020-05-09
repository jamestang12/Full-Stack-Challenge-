import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  GET_TASKS,
  ERROR,
  ADD_CURRENT_TASK,
  SET_ID,
  DELETE_CURRENT_TASK,
  ADD_TASKS,
  SET_CURRENT_TASK,
} from "../types";
import axios from "axios";

const TaskState = (props) => {
  const initialState = {
    tasks: null,
    loading: true,
    currentTasks: [],
    currentId: null,
    error: null,
    loader: false,
    currentTask: [],
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Get jobs in process
  const getTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Add jobs into databse
  const addTask = async (id, tasks) => {
    try {
      const config = {
        "Contact-Type": "application/json",
      };
      await Promise.all(
        tasks.map(async (task) => {
          await axios.post(`/api/tasks/${id}`, task, config);
        })
      );

      dispatch({
        type: ADD_TASKS,
        payload: "Success",
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Edit task
  const setCurrentTask = (value) => {
    dispatch({
      type: SET_CURRENT_TASK,
      payload: value,
    });
  };

  //Delete current task
  const deleteCurrentTask = (value) => {
    try {
      dispatch({
        type: DELETE_CURRENT_TASK,
        payload: value,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  //Add current task
  const addCurrenTask = (value) => {
    try {
      dispatch({
        type: ADD_CURRENT_TASK,
        payload: value,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  //Add current task
  const addCurrentTask = (value) => {
    try {
      dispatch({
        type: ADD_CURRENT_TASK,
        payload: value,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  //Set current id
  const setCurrentId = (value) => {
    try {
      dispatch({
        type: SET_ID,
        payload: value,
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err,
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        currentTasks: state.currentTasks,
        currentId: state.currentId,
        error: state.error,
        currentTask: state.currentTask,
        getTasks,
        addCurrentTask,
        setCurrentId,
        deleteCurrentTask,
        addTask,
        setCurrentTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
