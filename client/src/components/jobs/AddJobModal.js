import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import M from "materialize-css/dist/js/materialize.min.js";
import JobContext from "../../context/job/jobContext";

export const AddJobModal = () => {
  const jobContext = useContext(JobContext);
  const { addJobInProcess } = jobContext;

  useEffect(() => {
    M.AutoInit();
  }, []);

  const [problem, setProblem] = useState("");
  const [customer, setCustomer] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [responPerson, setResponPersonm] = useState("");
  const [otherReference, setOtherReference] = useState("");
  //const [problem, setProblem] = useState('');
  const date = "2020-05-10T06:15";
  const _id = uuidv4();

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
      M.toast({ html: "Plese fill out all input" });
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
      addJobInProcess(newJob);
      M.toast({ html: "Job added" });
    }
  };

  return (
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
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onsubmit}
          className="modal-close waves-effect blue white-text btn-flat"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%",
};

export default AddJobModal;
