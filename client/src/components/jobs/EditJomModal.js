import React, { useContext, useState, useEffect } from "react";
import EditTaskModal from "./EditTaskModal";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import JobContext from "../../context/job/jobContext";
import Preloader from "../layout/Preloading";
import Moment from "react-moment";
import M from "materialize-css/dist/js/materialize.min.js";
import MaterialItem from "../../components/jobs/materialItem";

export const EditJomModal = () => {
  const jobContext = useContext(JobContext);
  const {
    jobDataDate,
    jobDataServerTye,
    currentJob,
    loading,
    editTask,
    serialNumber,
    jobData,
    materialLoader,
    materials,
    saveUpdate,
    orgMaterials,
    setSaveLoder,
    saveLoader,
    getJobsInProcess,
    materialRemove,
  } = jobContext;
  const [serverType, setServerType] = useState("");
  const [date, setDate] = useState("");
  //const [startDate, setStartDate] = useState("");
  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    if (currentJob._id !== null) {
      setDate("");
      setServerType("");

      //console.log(startDate);
    }
  }, [currentJob]);

  useEffect(() => {
    if (saveLoader) {
      M.toast({ html: "Save completed" });
      getJobsInProcess();
      setSaveLoder(false);
    }
  }, [saveLoader]);

  useEffect(() => {
    console.log(`materials ${materials}`);
  }, [materialLoader]);

  const click2 = () => {
    console.log(`date ${date}`);
    console.log(`serverType ${serverType}`);
  };

  const onSave = () => {
    const newJobUpdate = {
      date: date,
      serverType,
      startDate: jobData.startDate,
    };

    M.toast({ html: "Saving....." });
    //deleteMaterial();
    console.log(`ssss222ss${materialRemove}`);
    saveUpdate(newJobUpdate, jobData._id);
    //getJobsInProcess();
  };

  return (
    <div id="edit-job-modal" className="modal">
      <nav>
        <div className="nav-wrapper blue">
          <span className="brand-logo center">Input Detalis</span>
        </div>
      </nav>
      <div className="row">
        <ul className="tabs">
          <li className="tab col s4">
            <a href="#tab1" className="active" id="tabOne">
              <i className="far fa-calendar-minus"> </i> Selete Type & Edit Time
            </a>
          </li>
          <li className="tab col s4">
            <a href="#tab2" id="tabTwo" onClick={click2}>
              <i className="fas fa-tasks"> </i> Edit & Add Task
            </a>
          </li>
          <li className="tab col s4">
            <a href="#tab3" id="tabThree">
              <i className="fas fa-paper-plane"> </i> Save & Submit
            </a>
          </li>
        </ul>
        <div
          id="tab1"
          className="col s12"
          style={{ padding: "25px 35px 0px 35px" }}
        >
          {loading ? (
            <Preloader />
          ) : (
            <div>
              <div>
                <h4> {editTask}</h4>
                <br />
                <p>
                  {jobData.problem} - {jobData.customer} (
                  {jobData.contactPerson})
                </p>
                <p>SN: {serialNumber}</p>
                <p>
                  Ref No: {jobData.otherReference}{" "}
                  <span className="right ">
                    <strong>
                      <Moment>{jobDataDate}</Moment>
                    </strong>
                  </span>
                </p>
                <div className="row">
                  <br />
                  {jobData.serverType === null ? (
                    <p>No server type been seleted</p>
                  ) : (
                    <p>Server type: {jobDataServerTye}</p>
                  )}
                  <div className="input-field">
                    <select
                      name="serverType"
                      value={serverType}
                      className="browser-default"
                      onChange={(e) => setServerType(e.target.value)}
                    >
                      <option value="" disabled>
                        Selete new server type
                      </option>
                      <option value="type1">Type 1</option>
                      <option value="type2">Type 2</option>
                      <option value="type3">Type 3</option>
                      <option value="type4">Type 4</option>
                    </select>
                  </div>
                  <p>
                    Start Time: <Moment>{jobDataDate}</Moment>
                  </p>
                  <label htmlFor="startTime">Set new due time</label>
                  <input
                    type="datetime-local"
                    name="date"
                    id="startTime"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <div className="progress">
                    <div
                      className="determinate blue"
                      style={{ width: "33%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          id="tab2"
          className="col s12"
          style={{ padding: "25px 35px 0px 35px" }}
        >
          {loading || materialLoader ? (
            <Preloader />
          ) : (
            <div>
              <div>
                <h4> {editTask}</h4>
                <br />
                <p>
                  {jobData.problem} - {jobData.customer} (
                  {jobData.contactPerson})
                </p>
                <p>SN: {serialNumber}</p>
                <p>
                  Ref No: {jobData.otherReference}{" "}
                  <span className="right ">
                    <strong>
                      <Moment>{jobDataDate}</Moment>
                    </strong>
                  </span>
                </p>
                <div className="row">
                  <br />
                  <ul className="collection with-header">
                    <li className="collection-header">
                      <h4>
                        List of materials
                        <a
                          href="#add-material-modal"
                          className="btn-floating btn-mid waves-effect waves-light red secondary-content modal-trigger"
                        >
                          <i className="fas fa-plus"></i>
                        </a>
                      </h4>
                    </li>
                    <li>
                      {materials.length === 0 ? (
                        <p className="center">No material to show.......</p>
                      ) : (
                        materials.map((material) => (
                          <MaterialItem
                            key={material._id}
                            material={material}
                          />
                        ))
                      )}
                    </li>
                  </ul>

                  <div className="progress">
                    <div
                      className="determinate blue"
                      style={{ width: "66%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          id="tab3"
          className="col s12"
          style={{ padding: "25px 35px 0px 35px" }}
        >
          {loading || materialLoader ? (
            <Preloader />
          ) : (
            <div>
              <div>
                <h4> {editTask}</h4>
                <br />
                <p>
                  {jobData.problem} - {jobData.customer} (
                  {jobData.contactPerson})
                </p>
                <p>SN: {serialNumber}</p>
                <p>
                  Ref No: {jobData.otherReference}{" "}
                  <span className="right ">
                    <strong>
                      <Moment>{jobDataDate}</Moment>
                    </strong>
                  </span>
                </p>
                <div className="row">
                  <div className="modal-footer">
                    <a
                      href="#!"
                      className=" waves-effect blue white-text btn-flat btn btn-extend"
                      onClick={onSave}
                    >
                      Save
                    </a>
                  </div>
                  <br />

                  <div className="progress">
                    <div
                      className="determinate blue"
                      style={{ width: "97%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
