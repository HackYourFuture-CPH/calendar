import React, { Component } from "react";
import { Link } from "react-router-dom";

import { MyContext } from "../../context";

import "./module-menu.scss";

class ModuleMenu extends Component {
  state = {
    visible: false
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
    let { deleteModule } = this.props;

    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <div
              className={`module-menu ${
                context.state.moduleMenuIsVisible ? "visible" : ""
              }`}
              style={{
                top: context.state.moduleMenuPosition.top,
                left: context.state.moduleMenuPosition.left
              }}
            >
              <Link to="/edit-module">Edit</Link>
              <button
                onClick={() =>
                  this.deleteModule(context.state.activeModuleMenuId)
                }
              >
                Delete
              </button>
              <div className="arrow-left" />
            </div>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

ModuleMenu.contextType = MyContext;

export default ModuleMenu;
