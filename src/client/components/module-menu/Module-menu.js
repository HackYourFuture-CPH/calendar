import React, { Component } from "react";
import { Link } from "react-router-dom";

import { MyContext } from "../../context";

import ModuleForm from "./../module-form/module-form";

import "./module-menu.scss";

class ModuleMenu extends Component {
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

  editModule = values => {
    // To update a teacher for a class we need both the new teacher id
    // and the id for the module_teachers entry
    if (this.context.state.moduleMenuActiveData.teachers[0]) {
      values.teacher_1_module_teachers_id = this.context.state.moduleMenuActiveData.teachers[0].id;
    }

    if (this.context.state.moduleMenuActiveData.teachers[1]) {
      values.teacher_2_module_teachers_id = this.context.state.moduleMenuActiveData.teachers[1].id;
    }

    fetch(`api/modules/${this.context.state.moduleMenuActiveData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
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
  };

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

    const defaultFormvalues = {
      title: this.context.state.moduleMenuActiveData.title,
      start_date: this.context.state.moduleMenuActiveData.start_date
        ? this.context.state.moduleMenuActiveData.start_date.split("T")[0]
        : "",
      end_date: this.context.state.moduleMenuActiveData.end_date
        ? this.context.state.moduleMenuActiveData.end_date.split("T")[0]
        : "",
      class_id: this.context.state.moduleMenuActiveData.class_id,
      teacher_1:
        this.context.state.moduleMenuActiveData.teachers &&
        this.context.state.moduleMenuActiveData.teachers[0]
          ? this.context.state.moduleMenuActiveData.teachers[0].teacher_id
          : "",
      teacher_2:
        this.context.state.moduleMenuActiveData.teachers &&
        this.context.state.moduleMenuActiveData.teachers[1]
          ? this.context.state.moduleMenuActiveData.teachers[1].teacher_id
          : ""
    };

    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <div
              className={`module-menu ${
                context.state.moduleMenuIsVisible ? "visible" : ""
              }`}
            >
              <section className="add-module">
                <h1>Edit module</h1>
                {hasTeachersAndClassesLoaded ? (
                  <div>Form loading</div>
                ) : (
                  <ModuleForm
                    classes={classes}
                    teachers={teachers}
                    defaultValues={defaultFormvalues}
                    onSubmit={this.editModule}
                  />
                )}

                <button
                  className="delete"
                  onClick={() =>
                    this.deleteModule(context.state.moduleMenuActiveData.id)
                  }
                >
                  Delete
                </button>
                <button
                  className="close"
                  onClick={() => {
                    context.state.setModuleMenuIsVisible(false);
                    context.state.setModuleMenuActiveData({});
                  }}
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
