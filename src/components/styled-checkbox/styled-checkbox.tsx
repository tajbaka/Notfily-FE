import * as classNames from "classnames";
import * as React from "react";

import { Checkbox, ICheckboxProps } from "@blueprintjs/core";

import "./styles.css";

export interface IStyledCheckboxProps extends ICheckboxProps {
  checkboxType?: string;
}

export const StyledCheckbox: React.SFC<IStyledCheckboxProps> = props => {
  const {
    className,
    checkboxType,
    ...checkboxProps
  } = props;

  const classes = classNames("styled-checkbox", checkboxType, className);
  return (
    <Checkbox
        className={classes} 
        {...checkboxProps}
    />
  );
};
