import React, { Fragment, useContext, useEffect } from "react";
import JobContext from "../../context/job/jobContext";
import JobItem from "./JobItem";
import Preloader from "../layout/Preloading";

const Jobs = () => {
  const jobContext = useContext(JobContext);
  const { jobsInProcess, getJobsInProcess, loading, loading2 } = jobContext;

  useEffect(() => {
    getJobsInProcess();
    //eslint-disable-next-line
  }, [loading2, loading]);

  if (loading || loading2) {
    return <Preloader />;
  } else {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            {jobsInProcess.map((job) => (
              <JobItem job={job} key={job._id} />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Jobs;
