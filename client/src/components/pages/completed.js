import React, { useEffect, useContext, Fragment } from "react";
import JobContext from "../../context/job/jobContext";
import CompNav from "../layout/CompletedNavbar";
import ComJobs from "../jobs/completedJob";

export const Completed = () => {
  const jobContext = useContext(JobContext);
  const { setPage } = jobContext;
  useEffect(() => {
    setPage("completed");
  }, []);
  return (
    <Fragment>
      <CompNav />
      <ComJobs />
    </Fragment>
  );
};

export default Completed;
