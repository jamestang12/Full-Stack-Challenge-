import React, { useState, useEffect, useContext } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import TaskContext from "../../context/task/taskContext";

export const EditTaskModal = () => {
  const taskContext = useContext(TaskContext);
  const { currentTask, updateCurrentTask } = taskContext;
  const [jobNumber, setJobNumber] = useState("");
  const [SerialNumber, setSerialNumber] = useState("");
  const [instructment, setInstructment] = useState("");
  const [job, setJob] = useState("");
  const [jobId, setJonId] = useState("");

  console.log(currentTask);

  useEffect(() => {
    if (currentTask) {
      setJobNumber(currentTask.jobNumber);
      setSerialNumber(currentTask.SerialNumber);
      setInstructment(currentTask.instructment);
      setJob(currentTask.job);
      setJonId(currentTask.jobId);
    }
  }, [currentTask]);

  const onsubmit = () => {
    if (jobNumber === "" || SerialNumber === "" || instructment === "") {
      M.toast({ html: "Field cannot be empty " });
    } else {
      const newTask = {
        jobNumber,
        SerialNumber,
        instructment,
        job,
        jobId,
      };
      updateCurrentTask(newTask);
      M.toast({ html: "Task updated" });
    }
  };

  return (
    <div id="edit-task-modal" className="modal">
      <div className="modal-content">
        <h4>Edit Task</h4>
        <br />
        <div className="row">
          <p>Job Number</p>
          <div className="input-field">
            <input
              type="text"
              name="jobNumber"
              value={jobNumber}
              onChange={(e) => setJobNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <p>Serial Number</p>
          <div className="input-field">
            <input
              type="text"
              name="SerialNumber"
              value={SerialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <p>Instructment</p>
          <div className="input-field">
            <input
              type="text"
              name="instructment"
              value={instructment}
              onChange={(e) => setInstructment(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onsubmit}
          className="modal-close waves-effect blue white-text btn btn-extend "
        >
          Enter{" "}
        </a>
      </div>
    </div>
  );
};

export default EditTaskModal;
