import React, { useContext, useEffect, Fragment } from "react";
import TaskContext from "../../context/task/taskContext";
import JobContext from "../../context/job/jobContext";

export const JobItem = ({ job }) => {
  const taskContext = useContext(TaskContext);
  const jobContext = useContext(JobContext);

  const {
    problem,
    customer,
    contactPerson,
    otherReference,
    duration,
    date,
    _id,
  } = job;
  const { tasks, getTasks, loading, timepass } = taskContext;
  const { setEditJob, setLoading, setTask } = jobContext;

  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  let serialNumber = "";
  let problems = "";

  const onClick = () => {
    setTask(problems, serialNumber, job);
    setLoading();
    setEditJob(_id);
  };

  //Append job number
  if (loading || tasks === null) {
    return <div className="container">loading</div>;
  } else {
    tasks.map((task) => {
      if (problems === "" && task.job === _id) {
        problems = problems.concat(task.jobNumber);
        serialNumber = serialNumber.concat(task.SerialNumber);
      } else if (task.job === _id) {
        problems = problems.concat(`, ${task.jobNumber}`);
        serialNumber = serialNumber.concat(`, ${task.SerialNumber}`);
      }
    });

    //Calculat duration
    const currentDate = new Date();
    const dueDate = new Date(date);
    let timePass2 = dueDate.getTime() - currentDate.getTime();
    let timePassRate = Math.round((timePass2 / duration) * 100);
    console.log(timePassRate);
    timePass2 = Math.round(timePass2 / 1000 / 60 / 60 / 24);

    //Set color
    let textColor = "determinate blue lighten-1";
    let textColor2 = "fas fa-clock medium blue-text";

    if (timepass < 0) {
      timepass = 0;
      timePassRate = 0;
    }

    if (timePassRate < 25 || timePass2 < 0) {
      textColor = "determinate red lighten-1";
      textColor2 = "fas fa-clock medium red-text";
    }

    return (
      <Fragment>
        <div className="col m6 s12">
          <div className="card horizontal">
            <div className="card-image">
              <div className="center" style={{ padding: "30px" }}>
                <i className={textColor2}></i>
                <h5>{timePass2} days</h5>
                <div className="progress grey lighten-1">
                  <div
                    className={textColor}
                    style={{ width: `${timePassRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <span className="card-title">{problems}</span>
                <br />
                <p>
                  {problem} - {customer} ({contactPerson})
                </p>
                <p>{otherReference}</p>
                <a
                  href="#edit-job-modal"
                  className="btn-floating btn-mid waves-effect waves-light blue secondary-content modal-trigger"
                  onClick={onClick}
                >
                  <i className="fas fa-pen"></i>{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default JobItem;
