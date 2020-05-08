import React, { Fragment, useContext, useEffect } from "react";
import JobContext from "../../context/job/jobContext";
import JobItem from "./JobItem";

const Jobs = () => {
  const jobContext = useContext(JobContext);
  const { jobsInProcess, getJobsInProcess, loading } = jobContext;

  useEffect(() => {
    getJobsInProcess();
    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <Fragment>
        {jobsInProcess.map((job) => (
          <JobItem job={job} />
        ))}
      </Fragment>
    );
  }
};

export default Jobs;
