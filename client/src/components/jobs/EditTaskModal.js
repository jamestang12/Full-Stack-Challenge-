import React, { useState, useEffect, useContext } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import TaskContext from "../../context/task/taskContext";

export const EditTaskModal = () => {
  const taskContext = useContext(TaskContext);
  const { currentTask } = taskContext;
  console.log(currentTask);

  useEffect(() => {
    M.AutoInit();
  }, []);
  let jobNumber = "";

  return (
    <div id="edit-task-modal" className="modal">
      <div className="modal-content">
        <h4>Edit Task</h4>
        <div className="row">
          <div className="input-field">
            <input type="text" name="jobNumber" value={jobNumber} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
