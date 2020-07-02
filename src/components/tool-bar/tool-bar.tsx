import * as classNames from "classnames";
import * as React from "react";

import { HTMLDivProps } from "@blueprintjs/core";

import "./styles.css";

export interface IToolBarProps extends HTMLDivProps {
  leftElement?: JSX.Element;
  centerElement?: JSX.Element;
  rightElement?: JSX.Element;
}

export class ToolBar extends React.PureComponent<IToolBarProps, {}> {
  public render() {
    const { className, leftElement, centerElement, rightElement } = this.props;
    const classes = classNames("tool-bar", className);

    if (!leftElement && !centerElement && !rightElement) {
      return null;
    }

    return (
      <div className={classes}>
        {leftElement && (
          <div className={classes + '-left-panel'}>{leftElement}</div>
        )}
        {centerElement && (
          <div className={classes + '-center-panel'}>{centerElement}</div>
        )}
        {rightElement && (
          <div className={classes + '-right-panel'}>{rightElement}</div>
        )}
      </div>
    );
  }
}

export default ToolBar;
