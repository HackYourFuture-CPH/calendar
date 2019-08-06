//import component from "react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./timeline-wrapper.scss";

import Timeline, {
  TimelineMarkers,
  TodayMarker,
  CustomMarker
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

import moment from "moment";
import ModuleMenu from "../module-menu/Module-menu";

import { MyContext } from "../../context";

class TimelineWrapper extends Component {
  componentDidMount() {
    fetch("api/modules")
      .then(response => response.json())
      .then(modules => this.context.state.setModules(modules));

    fetch("api/classes")
      .then(response => response.json())
      .then(classes => this.context.state.setClasses(classes));
  }

  handleClick(item) {
    item.start_date = item.start_time.toISOString();
    item.end_date = item.end_time.toISOString();

    this.context.state.setModuleMenuIsVisible(true);
    this.context.state.setModuleMenuActiveData(item);
  }

  itemRenderer({ item, itemContext, getItemProps, getResizeProps }) {
    const resizeProps = getResizeProps();

    const hasTeacherAssigned = item.teachers.length >= 1;

    const { left: leftResizeProps, right: rightResizeProps } = resizeProps;

    let className = "rct-item";
    if (item.teachers.length === 1) {
      className = `${className} one-teacher`;
    } else if (item.teachers.length === 2) {
      className = `${className} two-teachers`;
    }

    return (
      <div {...getItemProps(item.itemProps)} className={className}>
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
            >
              <TimelineMarkers>
                {/* <CustomMarker date={new Date().getTime()}>
                  {({ styles, date }) => (
                    <div
                      style={{
                        ...styles,
                        width: "0.5rem",
                        backgroundColor: "rgba(255,0,0,0.5)"
                      }}
                    />
                  )}
                </CustomMarker> */}
              </TimelineMarkers>
            </Timeline>

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
