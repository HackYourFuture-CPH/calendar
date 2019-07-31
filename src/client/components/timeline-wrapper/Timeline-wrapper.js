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

  handleClick(item) {
    this.context.state.setActiveModuleMenuId(item.id);
    const moduleMenuTriangleWidth = 20;

    this.context.state.setModuleMenuIsVisible(true);
    console.log(item);

    item.start_date = item.start_time.toISOString();
    item.end_date = item.end_time.toISOString();

    this.context.state.setModuleMenuActiveData(item);
  }

  itemRenderer({ item, itemContext, getItemProps, getResizeProps }) {
    console.log(item);

    const resizeProps = getResizeProps();

    const hasTeacherAssigned = item.teachers.length >= 1;

    const { left: leftResizeProps, right: rightResizeProps } = resizeProps;

    return (
      <div
        {...getItemProps(item.itemProps)}
        className={`rct-item ${hasTeacherAssigned ? "has-teacher" : ""}`}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}

        <div
          className="rct-item-content"
          style={{ maxHeight: `${itemContext.dimensions.height}` }}
        >
          {item.title}
        </div>
        <button onClick={() => this.handleClick(item)}>Edit</button>

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
            />

            <ModuleMenu />
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}
TimelineWrapper.contextType = MyContext;
Timeline.contextType = MyContext;
export default TimelineWrapper;
