import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import M from "materialize-css/dist/js/materialize.min.js";
import JobContext from "../../context/job/jobContext";
import TaskContext from "../../context/task/taskContext";
import TaskItem from "../task/taskItem";

export const AddTaskModal = () => {
  const taskContext = useContext(TaskContext);
  const { currentId, addCurrentTask } = taskContext;
  useEffect(() => {
    M.AutoInit();
  }, []);

  const [jobNumber, setJobNumber] = useState("");
  const [SerialNumber, setSerialNumber] = useState("");
  const [instructment, setInstructment] = useState("");
  const jobId = uuidv4();

  const onsubmit = () => {
    if (jobNumber === "" || SerialNumber === "" || instructment === "") {
      M.toast({ html: "Plese fill out all field" });
    } else {
      const newJob = {
        jobNumber,
        SerialNumber,
        instructment,
        job: currentId,
        jobId,
      };
      setJobNumber("");
      setSerialNumber("");
      setInstructment("");
      addCurrentTask(newJob);
      M.toast({ html: "Job added" });
    }
  };

  return (
    <div id="add-task-modal" className="modal">
      <div className="modal-content">
        <h4>Add new task</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="jobNumber"
              value={jobNumber}
              onChange={(e) => setJobNumber(e.target.value)}
            />
            <label htmlFor="jobNumber" className="active">
              Job Number
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="SerialNumber"
              value={SerialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
            <label htmlFor="SerialNumber" className="active">
              Serial Nnumber
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="instructment"
              value={instructment}
              onChange={(e) => setInstructment(e.target.value)}
            />
            <label htmlFor="instructment" className="active">
              Instructment
            </label>
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

export default AddTaskModal;
