import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Form, Field } from "react-final-form";
import moment from "moment";

import { MyContext } from "../../context";

import "./module-menu.scss";

class ModuleMenu extends Component {
  state = {
    visible: false,
    teachers: [],
    classes: [],
    activeModule: {},
    titleInEditMode: false
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

    fetch(`api/modules/${this.context.state.activeModuleMenuId}`, {
      method: "PATCH", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(ajaxResponse => {
        fetch("api/modules")
          .then(response => response.json())
          .then(modules => {
            this.context.state.setModules(modules);
            this.context.state.setModuleMenuIsVisible(false);
          });
      }); // parses JSON response into native JavaScript objects
  }

  deleteModule(moduleId) {
    fetch(`api/modules/${moduleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(ajaxResponse => {
        fetch("api/modules")
          .then(response => response.json())
          .then(modules => {
            this.context.state.setModules(modules);
            this.context.state.setModuleMenuIsVisible(false);
          });
      });
  }

  render() {
    const teachers = this.state.teachers;
    const classes = this.state.classes;

    const hasTeachersAndClassesLoaded =
      teachers.length === 0 && classes.length === 0;
    let { deleteModule } = this.props;

    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <div
              className={`module-menu ${
                context.state.moduleMenuIsVisible ? "visible" : ""
              }`}
            >
              <div className="arrow-left" />

              <section className="add-module">
                <h1>Edit module</h1>
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
                          <Field
                            name="title"
                            component="input"
                            placeholder="Title"
                            defaultValue={
                              context.state.moduleMenuActiveData.title
                            }
                          />
                        </div>
                        <div className="start-date">
                          <label>Start date</label>
                          <Field
                            name="start_date"
                            component="input"
                            type="date"
                            placeholder="Start date"
                            defaultValue={
                              context.state.moduleMenuActiveData.start_date
                                ? context.state.moduleMenuActiveData.start_date.split(
                                    "T"
                                  )[0]
                                : ""
                            }
                          />
                        </div>
                        <div className="end-date">
                          <label>End date</label>
                          <Field
                            name="end_date"
                            component="input"
                            type="date"
                            placeholder="End date"
                            defaultValue={
                              context.state.moduleMenuActiveData.end_date
                                ? context.state.moduleMenuActiveData.end_date.split(
                                    "T"
                                  )[0]
                                : ""
                            }
                          />
                        </div>

                        <div className="class_id">
                          <label>Select class id</label>
                          <Field
                            name="class_id"
                            component="select"
                            defaultValue={
                              context.state.moduleMenuActiveData.class_id
                            }
                          >
                            <option disabled value="">
                              Select a class
                            </option>
                            {classes.map(currentClass => (
                              <option
                                value={currentClass.id}
                                key={currentClass.id}
                              >
                                {currentClass.title}
                              </option>
                            ))}
                          </Field>
                        </div>

                        <div className="teacher_1">
                          <label>Select teacher 1</label>
                          <Field
                            name="teacher_1"
                            component="select"
                            defaultValue={
                              context.state.moduleMenuActiveData.teachers &&
                              context.state.moduleMenuActiveData.teachers
                                .length >= 1
                                ? context.state.moduleMenuActiveData.teachers[0]
                                    .id
                                : 0
                            }
                          >
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
                          <Field
                            name="teacher_2"
                            component="select"
                            defaultValue={
                              context.state.moduleMenuActiveData.teachers &&
                              context.state.moduleMenuActiveData.teachers
                                .length >= 1 &&
                              typeof context.state.moduleMenuActiveData
                                .teachers[1] !== "undefined"
                                ? context.state.moduleMenuActiveData.teachers[1]
                                    .id
                                : 0
                            }
                          >
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
                          Save module
                        </button>
                      </form>
                    )}
                  />
                )}

                <button
                  className="delete"
                  onClick={() =>
                    this.deleteModule(context.state.activeModuleMenuId)
                  }
                >
                  Delete
                </button>
                <button
                  className="close"
                  onClick={() => context.state.setModuleMenuIsVisible(false)}
                >
                  Close
                </button>
              </section>
            </div>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

ModuleMenu.contextType = MyContext;

export default ModuleMenu;
