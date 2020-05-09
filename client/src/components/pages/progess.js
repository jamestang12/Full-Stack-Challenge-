import React, { Fragment, useEffect, useContext } from "react";
import ProcessNavbar from "../layout/ProcessNavbar";
import Jobs from "../jobs/Jobs";
import AddBtn from "../layout/AddBtn";
import AddJobModal from "../jobs/AddJobModal";
import M from "materialize-css/dist/js/materialize.min.js";
import AddTaskModal from "../jobs/AddTaskModal";
import EditTaskModal from "../jobs/EditTaskModal";
import JobContext from "../../context/job/jobContext";

export const Progess = () => {
  const jobContext = useContext(JobContext);
  const { setPage } = jobContext;

  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
    setPage("process");
  }, []);

  return (
    <Fragment>
      <ProcessNavbar />
      <Jobs />
      <AddBtn />
      <AddJobModal />
      <EditTaskModal />
      <AddTaskModal />
    </Fragment>
  );
};

export default Progess;
