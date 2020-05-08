import React, { useEffect, Fragment } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import Progess from "./components/pages/progess";
import Completed from "./components/pages/completed";
import BottomNav from "./components/layout/BottomNav";
import JobState from "./context/job/JobState";
import TaskState from "./context/task/TaskState";

const App = () => {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  });

  return (
    <TaskState>
      <JobState>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path="/" component={Progess} />
              <Route exact path="/completed" component={Completed} />
            </Switch>
            <BottomNav />
          </Fragment>
        </Router>
      </JobState>
    </TaskState>
  );
};

export default App;
