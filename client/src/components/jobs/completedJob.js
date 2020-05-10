import React, { Fragment, useContext, useEffect } from "react";
import JobContext from "../../context/job/jobContext";
import CompledJobItem from "./completedJobItem";
import Preloader from "../layout/Preloading";

const Jobs = () => {
  const jobContext = useContext(JobContext);
  const { jobsInCompleted, getCompletedJobs, loading3 } = jobContext;

  useEffect(() => {
    getCompletedJobs();
    //eslint-disable-next-line
  }, [loading3]);

  if (loading3) {
    return <Preloader />;
  } else {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            {jobsInCompleted.map((job) => (
              <CompledJobItem job={job} key={job._id} />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Jobs;
