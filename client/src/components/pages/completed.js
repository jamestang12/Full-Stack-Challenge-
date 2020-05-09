import React, { useEffect, useContext } from "react";
import JobContext from "../../context/job/jobContext";

export const Completed = () => {
  const jobContext = useContext(JobContext);
  const { setPage } = jobContext;
  useEffect(() => {
    setPage("completed");
  }, []);
  return <div>completed</div>;
};

export default Completed;
