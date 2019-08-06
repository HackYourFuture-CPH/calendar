import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { MyContext } from "../../context";
import { Link } from "react-router-dom";
import moment from "moment";

class ModuleForm extends Component {
  onSubmit(values) {}

  render() {
    const teachers = this.props.teachers;
    const classes = this.props.classes;

    return (
      <MyContext.Consumer>
        {context => (
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
            onSubmit={values => this.props.onSubmit(values)}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                <div className="title">
                  <label>Title</label>
                  <Field
                    name="title"
                    component="input"
                    placeholder="Title"
                    defaultValue={this.props.defaultValues.title}
                  />
                </div>
                <div className="start-date">
                  <label>Start date</label>
                  <Field
                    name="start_date"
                    component="input"
                    type="date"
                    placeholder="Start date"
                    defaultValue={this.props.defaultValues.start_date}
                  />
                </div>
                <div className="end-date">
                  <label>End date</label>
                  <Field
                    name="end_date"
                    component="input"
                    type="date"
                    placeholder="End date"
                    defaultValue={this.props.defaultValues.end_date}
                  />
                </div>

                <div className="class_id">
                  <label>Select class id</label>
                  <Field
                    name="class_id"
                    component="select"
                    defaultValue={this.props.defaultValues.class_id}
                  >
                    <option disabled value="">
                      Select a class
                    </option>
                    {classes.map(currentClass => {
                      return (
                        <option value={currentClass.id} key={currentClass.id}>
                          {currentClass.title}
                        </option>
                      );
                    })}
                  </Field>
                </div>

                <div className="teacher_1">
                  <label>Select teacher 1</label>
                  <Field
                    name="teacher_1"
                    component="select"
                    defaultValue={this.props.defaultValues.teacher_1}
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
                    defaultValue={this.props.defaultValues.teacher_2}
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
      </MyContext.Consumer>
    );
  }
}

ModuleForm.contextType = MyContext;

export default ModuleForm;
