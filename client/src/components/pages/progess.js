import React, { Fragment, useEffect } from "react";
import ProcessNavbar from "../layout/ProcessNavbar";
import Jobs from "../jobs/Jobs";
import AddBtn from "../layout/AddBtn";
import AddJobModal from "../jobs/AddJobModal";
import M from "materialize-css/dist/js/materialize.min.js";

export const Progess = () => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  }, []);

  return (
    <Fragment>
      <ProcessNavbar />
      <Jobs />
      <AddBtn />
      <AddJobModal />
    </Fragment>
  );
};

export default Progess;
