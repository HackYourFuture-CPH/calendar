import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Field } from "react-final-form";

import ModuleForm from "./../module-form/module-form";

import "./add-module.scss";

class AddModule extends Component {
  state = {
    teachers: [],
    classes: []
  };

  componentDidMount() {
    fetch("api/teachers")
      .then(response => response.json())
      .then(teachers => {
        this.setState({ teachers });
      });

    fetch("api/classes")
      .then(response => response.json())
      .then(classes => {
        this.setState({ classes });
      });
  }

  createNewModule = values => {
    fetch("api/modules", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(ajaxResponse => {
        console.log(ajaxResponse);
        this.props.history.push("/");
      }); // parses JSON response into native JavaScript objects
  };

  render() {
    const teachers = this.state.teachers;
    const classes = this.state.classes;

    const hasTeachersAndClassesLoaded =
      teachers.length === 0 && classes.length === 0;

    const defaultFormvalues = {
      title: "",
      start_date: "",
      end_date: "",
      class_id: "",
      teacher_1: "",
      teacher_2: ""
    };

    return (
      <section className="add-module">
        <h1>Add new module</h1>
        {hasTeachersAndClassesLoaded ? (
          <div>Form loading</div>
        ) : (
          <ModuleForm
            classes={classes}
            teachers={teachers}
            defaultValues={defaultFormvalues}
            onSubmit={this.createNewModule}
          />
        )}
      </section>
    );
  }
}

export default AddModule;
