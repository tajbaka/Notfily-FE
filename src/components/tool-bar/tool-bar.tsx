import * as classNames from "classnames";
import * as React from "react";

import {
  Alignment,
  HTMLDivProps,
  Navbar,
  NavbarGroup
} from "@blueprintjs/core";

import { Classes } from "src/mpd-library";

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
      <Navbar className={classes}>
        {leftElement && (
          <NavbarGroup align={Alignment.LEFT}>{leftElement}</NavbarGroup>
        )}
        {centerElement && (
          <NavbarGroup align={Alignment.CENTER} className={Classes.ALIGN_CENTER}>{centerElement}</NavbarGroup>
        )}
        {rightElement && (
          <NavbarGroup align={Alignment.RIGHT}>{rightElement}</NavbarGroup>
        )}
      </Navbar>
    );
  }
}

export default ToolBar;
