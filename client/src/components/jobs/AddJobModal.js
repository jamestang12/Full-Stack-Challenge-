import React, { useState, useEffect, useContext, Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import M from "materialize-css/dist/js/materialize.min.js";
import JobContext from "../../context/job/jobContext";
import TaskContext from "../../context/task/taskContext";
import TaskItem from "../task/taskItem";
import AddTaskModal from "../jobs/AddTaskModal";

export const AddJobModal = () => {
  const jobContext = useContext(JobContext);
  const taskContext = useContext(TaskContext);
  const { addJobInProcess, setLoading } = jobContext;
  const { currentTasks, setCurrentId, currentId, addTask } = taskContext;

  useEffect(() => {
    M.AutoInit();
    if (currentId === null) {
      let id = uuidv4();
      setCurrentId(id);
    }
  }, []);

  const [problem, setProblem] = useState("");
  const [customer, setCustomer] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [responPerson, setResponPersonm] = useState("");
  const [otherReference, setOtherReference] = useState("");
  const [date, setDate] = useState("");
  const _id = currentId;

  const onsubmit = () => {
    if (
      problem === "" ||
      customer === "" ||
      problem === "" ||
      contactPerson === "" ||
      responPerson === "" ||
      otherReference === "" ||
      date === ""
    ) {
      M.toast({ html: "Plese fill out all field" });
    }
    if (currentTasks.length === 0) {
      M.toast({ html: "Plese add a job" });
    } else {
      const newJob = {
        problem,
        customer,
        contactPerson,
        responPerson,
        otherReference,
        date,
        _id,
      };
      console.log(newJob);
      setLoading();
      addTask(currentId, currentTasks);
      addJobInProcess(newJob);
      setProblem("");
      setCurrentId(uuidv4());
      setCustomer("");
      setContactPerson("");
      setResponPersonm("");
      setOtherReference("");
      setDate("");
      M.toast({ html: "Job added" });
    }
  };

  return (
    <Fragment>
      <AddTaskModal />
      <div id="add-job-modal" className="modal" style={modalStyle}>
        <div className="modal-content">
          <div className="row">
            <div className="input-field">
              <input
                type="text"
                name="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
              <label htmlFor="problem" className="active">
                Problem
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input
                type="text"
                name="customer"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
              />
              <label htmlFor="customer" className="active">
                Customer
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input
                type="text"
                name="contactPerson"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
              <label htmlFor="contactPerson" className="active">
                Contact Person
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input
                type="text"
                name="responPerson"
                value={responPerson}
                onChange={(e) => setResponPersonm(e.target.value)}
              />
              <label htmlFor="responPerson" className="active">
                Responsible Person
              </label>
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input
                type="text"
                name="otherReference"
                value={otherReference}
                onChange={(e) => setOtherReference(e.target.value)}
              />
              <label htmlFor="otherReference" className="active">
                Other Reference
              </label>
            </div>
          </div>

          <div className="row">
            <input
              id="party"
              type="datetime-local"
              name="partydate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <ul className="collection with-header">
            <li className="collection-header">
              <h4>
                List of Job{" "}
                <a
                  href="#add-task-modal"
                  className="btn-floating btn-mid waves-effect waves-light red secondary-content modal-trigger"
                >
                  <i className="fas fa-plus"></i>{" "}
                </a>
              </h4>
            </li>
            <li>
              {currentTasks.length === 0 ? (
                <p className="center">No jobs to show.....</p>
              ) : (
                currentTasks.map((task) => (
                  <TaskItem task={task} key={task.jobId} />
                ))
              )}
            </li>
          </ul>

          <div className="row"></div>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={onsubmit}
            className="modal-close waves-effect blue white-text btn-flat btn btn-extend"
          >
            Enter
          </a>
        </div>
      </div>
    </Fragment>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%",
};

export default AddJobModal;
