//import component from "react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./timeline-wrapper.scss";

import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

import moment from "moment";
import ModuleMenu from "../moduleMenu/Module-menu";

import { MyContext } from "../../context";

class TimelineWrapper extends Component {
  state = {
    modules: [],
    classes: [],
    mousePosition: {},
    moduleMenuPosition: {},
    activeModuleId: 0
  };

  componentDidMount() {
    fetch("api/modules")
      .then(response => response.json())
      .then(modules => this.context.state.setModules(modules));

    fetch("api/classes")
      .then(response => response.json())
      .then(classes => this.context.state.setClasses(classes));
  }

  handleClick(item, itemContext) {
    this.context.state.setActiveModuleMenuId(item.id);
    const moduleMenuTriangleWidth = 20;

    this.context.state.setModuleMenuPosition({
      top: itemContext.dimensions.top,
      left:
        itemContext.dimensions.left +
        itemContext.dimensions.width +
        moduleMenuTriangleWidth
    });
    this.context.state.setModuleMenuIsVisible(true);
  }

  itemRenderer({ item, itemContext, getItemProps, getResizeProps }) {
    const resizeProps = getResizeProps();

    const { left: leftResizeProps, right: rightResizeProps } = resizeProps;
    return (
      <div {...getItemProps(item.itemProps)}>
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}

        <div
          className={`rct-item-content ${
            item.hasTeacherAssigned ? "has-teacher" : ""
          }`}
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          {itemContext.title}
          <button onClick={() => this.handleClick(item, itemContext)}>
            Edit
          </button>
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
      </div>
    );
  }

  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <Timeline
              groups={context.state.classes}
              items={context.state.modules}
              defaultTimeStart={moment(new Date()).add(-0.5, "month")}
              defaultTimeEnd={moment(new Date()).add(2.5, "month")}
              itemRenderer={this.itemRenderer.bind(this)}
              lineHeight={100}
            >
              <ModuleMenu />
            </Timeline>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}
TimelineWrapper.contextType = MyContext;
Timeline.contextType = MyContext;
export default TimelineWrapper;
