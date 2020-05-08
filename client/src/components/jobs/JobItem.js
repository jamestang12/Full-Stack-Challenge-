import React, { useContext, useEffect, Fragment } from "react";
import JobContext from "../../context/task/taskContext";

export const JobItem = ({ job }) => {
  const jobContext = useContext(JobContext);
  const {
    problem,
    customer,
    contactPerson,
    otherReference,
    duration,
    date,
  } = job;
  const { tasks, getTasks, loading } = jobContext;

  useEffect(() => {
    getTasks();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <div className="container">loading</div>;
  } else {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div className="card horizontal">
                <div className="card-image">
                  <h1> Hello </h1>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <span className="card-title">Test</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default JobItem;
