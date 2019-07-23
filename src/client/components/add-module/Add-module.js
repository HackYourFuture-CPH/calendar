import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Form, Field } from "react-final-form";

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

  onSubmit(values) {
    console.log(values);

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
  }

  render() {
    const teachers = this.state.teachers;
    const classes = this.state.classes;

    const hasTeachersAndClassesLoaded =
      teachers.length === 0 && classes.length === 0;
    return (
      <section className="add-module">
        <h1>Add new module</h1>
        {hasTeachersAndClassesLoaded ? (
          <div>Form loading</div>
        ) : (
          <Form
            validate={values => {
              const errors = {};
              if (!values.title) {
                errors.title = "Required";
              }
              if (!values.start_date) {
                errors.start_date = "Required";
              }
              if (!values.end_date) {
                errors.end_date = "Required";
              }
              return errors;
            }}
            onSubmit={values => this.onSubmit(values)}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                <div className="title">
                  <label>Title</label>
                  <Field name="title" component="input" placeholder="Title" />
                </div>
                <div className="start-date">
                  <label>Start date</label>
                  <Field
                    name="start_date"
                    component="input"
                    type="date"
                    placeholder="Start date"
                  />
                </div>
                <div className="end-date">
                  <label>End date</label>
                  <Field
                    name="end_date"
                    component="input"
                    type="date"
                    placeholder="End date"
                  />
                </div>

                <div className="class_id">
                  <label>Select class id</label>
                  <Field name="class_id" component="select" defaultValue="">
                    <option disabled value="">
                      Select a class
                    </option>
                    {classes.map(currentClass => (
                      <option value={currentClass.id} key={currentClass.id}>
                        {currentClass.title}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="teacher_1">
                  <label>Select teacher 1</label>
                  <Field name="teacher_1" component="select" defaultValue="">
                    <option disabled value="">
                      Select a teacher
                    </option>
                    {teachers.map(teacher => (
                      <option value={teacher.id} key={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="teacher_2">
                  <label>Select teacher 2</label>
                  <Field name="teacher_2" component="select" defaultValue="">
                    <option disabled value="">
                      Select a teacher
                    </option>
                    {teachers.map(teacher => (
                      <option value={teacher.id} key={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </Field>
                </div>

                <p>
                  Missin a teacher? Add them here:{" "}
                  <Link to="/add-teacher">Create new teacher</Link>
                </p>

                <button type="submit" disabled={pristine || invalid}>
                  Create new module
                </button>
              </form>
            )}
          />
        )}
      </section>
    );
  }
}

export default AddModule;
