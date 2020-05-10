import React, { useContext, useEffect, Fragment } from "react";
import TaskContext from "../../context/task/taskContext";
import JobContext from "../../context/job/jobContext";

export const CompletedItem = ({ job }) => {
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
  const { setEditJob, setLoading, setTask, clearState } = jobContext;

  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  let serialNumber = "";
  let problems = "";

  //Append job number
  if (loading || tasks === null) {
    return <div className="container">loading</div>;
  } else {
    console.log(tasks);
    tasks.map((task) => {
      if (problems === "" && task.job === _id) {
        problems = problems.concat(task.jobNumber);
        serialNumber = serialNumber.concat(task.SerialNumber);
      } else if (task.job === _id) {
        problems = problems.concat(`, ${task.jobNumber}`);
        serialNumber = serialNumber.concat(`, ${task.SerialNumber}`);
      }
    });

    return (
      <Fragment>
        <div className="col m6 s12">
          <div className="card horizontal">
            <div className="card-image">
              <div className="center" style={{ padding: "30px" }}>
                <i className="fas fa-check-circle green-text medium"></i>
                <h5>Job Completed</h5>
                <div className="progress grey lighten-1">
                  <div
                    className="determinate green lighten-1"
                    style={{ width: `100%` }}
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
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default CompletedItem;
