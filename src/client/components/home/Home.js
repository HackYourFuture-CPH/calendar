import React, { Component } from "react";

import { Link } from "react-router-dom";
import TimelineWrapper from "../timeline-wrapper/Timeline-wrapper";

import "./home.scss";

class Home extends Component {
  render() {
    return (
      <section>
        <TimelineWrapper />
        <Link className="add-module" to="/add-module">
          <span>+</span>
        </Link>
      </section>
    );
  }
}

export default Home;
