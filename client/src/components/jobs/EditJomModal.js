import React, { useContext } from "react";
import EditTaskModal from "./EditTaskModal";
import $ from "jquery";
import { findDOMNode } from "react-dom";
import JobContext from "../../context/job/jobContext";
import Preloader from "../layout/Preloading";
import Moment from "react-moment";

export const EditJomModal = () => {
  const jobContext = useContext(JobContext);
  const { currentJob, loading, editTask, serialNumber, jobData } = jobContext;

  let test = new Date(jobData.date);
  test = test.getTime();
  console.log(`tttttttt ${test}`);

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
            <a href="#tab2" id="tabTwo">
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
                      <Moment>{jobData.date}</Moment>
                    </strong>
                  </span>
                </p>
              </div>

              <div className="progress">
                <div
                  className="determinate blue"
                  style={{ width: "33%" }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div
          id="tab2"
          className="col s12"
          style={{ padding: "25px 35px 0px 35px" }}
        >
          <h3>Tab 2</h3>
          <p>Lorem ipsum dolor sit amet consecttiur daiosicpting elit</p>
          <div className="progress">
            <div className="determinate blue" style={{ width: "66%" }}></div>
          </div>
        </div>
        <div
          id="tab3"
          className="col s12"
          style={{ padding: "25px 35px 0px 35px" }}
        >
          <h3>Tab 3</h3>
          <p>Lorem ipsum dolor sit amet consecttiur daiosicpting elit</p>
          <div className="progress">
            <div className="determinate blue" style={{ width: "99%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
