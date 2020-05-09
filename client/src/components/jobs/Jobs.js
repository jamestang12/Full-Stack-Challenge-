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
        {jobsInProcess.map((job) => (
          <JobItem job={job} key={job._id} />
        ))}
      </Fragment>
    );
  }
};

export default Jobs;
