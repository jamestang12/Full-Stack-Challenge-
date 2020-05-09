import React, { useContext } from "react";
import { Link } from "react-router-dom";
import JobContext from "../../context/job/jobContext";

export const BottomNav = () => {
  const jobContext = useContext(JobContext);
  const { page } = jobContext;
  let processClassname = "";
  let completedClassname = "";
  if (page === "process") {
    processClassname = "blue-text  center";
    completedClassname = "black-text  center";
  } else {
    processClassname = "black-text  center";
    completedClassname = "blue-text  center";
  }

  return (
    <footer className="page-footer white lighten-1 buttom" style={footerStyle}>
      <div className="footer-copyright white darken-1">
        <div className="container">
          <div className="row">
            <div className="col s6">
              <Link className={processClassname} to="/">
                <h5>
                  <i className="fas fa-briefcase"> </i> Progress
                </h5>
              </Link>
            </div>
            <div className="col s6">
              <Link className={completedClassname} to="/completed">
                <h5>
                  <i className="far fa-list-alt"> </i> Completed
                </h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
};

export default BottomNav;
