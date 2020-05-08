import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import { GET_TASKS, ERROR } from "../types";
import axios from "axios";

const TaskState = (props) => {
  const initialState = {
    tasks: null,
    loading: true,
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

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        getTasks,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
