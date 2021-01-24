import * as classNames from "classnames";
import * as React from "react";

import { Alert, IAlertProps } from "@blueprintjs/core";

import "./styles.css";

export interface IStyledAlertProps extends IAlertProps {
  type?: string;
}

export const StyledAlert: React.SFC<IStyledAlertProps> = props => {
  const {
    className,
    type,
    ...alertProps
  } = props;

  const classes = "styled-alert";

  return (
    <Alert
        className={classNames(classes, className, type)}
        {...alertProps}
    />
  );
};
