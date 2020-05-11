import React, { useReducer } from "react";
import JobContext from "./jobContext";
import jobReducer from "./jobReducer";
import {
  MATERIAL_ALERT,
  SERVER_ALERT,
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
  SAVE_UPDATE,
  SAVE_LOADER,
  SAVE_SERVERTYPE,
  UPDATE_DATE,
  ADD_REMOVIE_LIST,
  CALL_BACL_MATERIAL,
  CLEAR_CURRENT_TASKS,
  CLEAR_JOB_IN_PROCESS,
  CLEAR_JOB_DATA,
} from "../types";
import axios from "axios";

const JobState = (props) => {
  const initialState = {
    removeMaterialList: [],
    loading: true,
    jobsInProcess: [],
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
    jobDataId: [],
    jobDataServerTye: [],
    saveLoader: false,
    jobDataDate: [],
    jobDataDay: [],
    materialAlert: false,
    serverAlert: false,
  };

  const [state, dispatch] = useReducer(jobReducer, initialState);

  //Delete current material
  const deleteCurrentMaterial = (value) => {
    dispatch({
      type: DELETE_CURRENT_MATERIAL,
      payload: value,
    });
  };

  const addRemoveList = (value) => {
    dispatch({
      type: ADD_REMOVIE_LIST,
      payload: value,
    });
  };

  //Save update
  const saveUpdate = async (jobValue, id, state) => {
    const config = {
      headers: {
        "Contact-Type": "application/json",
      },
    };
    try {
      if (jobValue.serverType !== "") {
        await axios.put(
          `api/jobs/update/${id}`,
          { serverType: jobValue.serverType },
          config
        );
        dispatch({
          type: SAVE_SERVERTYPE,
          payload: jobValue.serverType,
        });
      }

      if (jobValue.date !== "") {
        const dueDate = jobValue.date;
        const startDate = jobValue.startDate;
        const DueDate = new Date(dueDate);
        const StartDate = new Date(startDate);
        const duration = DueDate.getTime() - StartDate.getTime();
        const res = await axios.put(
          `api/jobs/update/${id}`,
          { duration: duration, date: dueDate },
          config
        );

        dispatch({
          type: UPDATE_DATE,
          payload: jobValue.date,
        });
      }

      try {
        if (state.materialRemove.length !== 0) {
          await Promise.all(
            state.materialRemove.map(async (material) => {
              await axios.delete(`api/materials/${material._id}`);
            })
          );
        }

        if (state.orgMaterials.length === 0) {
          if (state.materials.length !== 0) {
            await Promise.all(
              state.materials.map(async (material) => {
                await axios.post(`api/materials/${id}`, material, config);
              })
            );
          }
        } else if (state.orgMaterials.length !== 0) {
          const oldMaterial = [];
          const newList = [];
          for (let i = 0; i < state.materials.length; i++) {
            newList.push(state.materials[i]);
          }
          if (state.materials.length !== 0) {
            for (let i = 0; i < state.materials.length; i++) {
              for (let x = 0; x < state.orgMaterials.length; x++) {
                if (state.materials[i]._id === state.orgMaterials[x]._id) {
                  oldMaterial.push(state.materials[i]);
                  newList.splice(i, 1);
                }
              }
            }
          }
          await Promise.all(
            newList.map(async (material) => {
              await axios.post(`api/materials/${id}`, material, config);
            })
          );
          await Promise.all(
            oldMaterial.map(async (material) => {
              await axios.put(
                `api/materials/${material._id}`,
                material,
                config
              );
            })
          );
        }
      } catch (error) {
        dispatch({
          type: ERROR,
          payload: error,
        });
      }
      if (state === "submit") {
        //await axios.put(`api/jobs/${id}`);
        dispatch({
          type: CLEAR_JOB_DATA,
        });

        dispatch({
          type: CLEAR_JOB_IN_PROCESS,
          value: id,
        });
      }
      dispatch({
        type: SAVE_UPDATE,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };

  //Set alert for material
  const setMaterialAlert = (value) => {
    dispatch({
      type: MATERIAL_ALERT,
      payload: value,
    });
  };

  //Set alert for server
  const setServerAlert = (value) => {
    dispatch({
      type: SERVER_ALERT,
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

  //Set save loader
  const setSaveLoder = (value) => {
    dispatch({
      type: SAVE_LOADER,
      payload: value,
    });
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

  const setTask = (value, serialNumber, data, serverType, jobDataDate, day) => {
    dispatch({
      type: EDIT_TASK,
      payload: value,
      payload2: serialNumber,
      payload3: data,
      payload4: serverType,
      payload5: jobDataDate,
      payload6: day,
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
        serverAlert: state.serverAlert,
        materialAlert: state.materialAlert,
        removeMaterialList: state.removeMaterialList,
        jobDataDay: state.jobDataDay,
        jobDataDate: state.jobDataDate,
        jobDataServerTye: state.jobDataServerTye,
        saveLoader: state.saveLoader,
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
        removeMaterial: state.removeMaterial,
        getJobsInProcess,
        getCompletedJobs,
        setLoading,
        addRemoveList,
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
        saveUpdate,
        setSaveLoder,
        setServerAlert,
        setMaterialAlert,
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState;
