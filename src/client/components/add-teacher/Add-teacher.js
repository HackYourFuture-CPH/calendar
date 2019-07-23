import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Field } from "react-final-form";

import "./add-teacher.scss";

class AddTeacher extends Component {
  onSubmit(values) {
    fetch("api/teachers", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(ajaxResponse => {
        this.props.history.push("/add-module");
      }); // parses JSON response into native JavaScript objects
  }

  render() {
    return (
      <section className="add-teacher">
        <h1>Add new teacher</h1>
        <Form
          onSubmit={values => this.onSubmit(values)}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <div className="name">
                <label>Name</label>
                <Field name="name" component="input" placeholder="Name" />
              </div>
              <button type="submit" disabled={pristine || invalid}>
                Create new teacher
              </button>
            </form>
          )}
        />
      </section>
    );
  }
}

export default AddTeacher;
