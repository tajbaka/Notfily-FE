import * as classNames from "classnames";
import * as React from "react";
// import * as myClasses from "../";

import { ISwitchProps, Switch } from "@blueprintjs/core";

interface IStyledSwitchProps extends ISwitchProps {
  types?: string;
}

import "./styles.css";

export const StyledSwitch: React.SFC<IStyledSwitchProps> = props => {
  const { className, type,  ...switchProps } = props;
  const classes = classNames("styled-switch", type, className);

  return (
    <Switch className={classes} {...switchProps} />
  );
};
