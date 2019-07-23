import React from "react";

import { Route, withRouter, Link } from "react-router-dom";

// <Route exact path="/signup" component={SignUp} />

import AddModule from "../components/add-module/Add-module";
import AddTeacher from "../components/add-teacher/Add-teacher";
import Home from "../components/home/Home";

const MainRouter = props => {
  return (
    <React.Fragment>
      <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/add-module" component={AddModule} />
          <Route exact path="/add-teacher" component={AddTeacher} />
      </div>
    </React.Fragment>
  );
};

export default withRouter(MainRouter);
