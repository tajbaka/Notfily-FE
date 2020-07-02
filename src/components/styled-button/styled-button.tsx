import * as classNames from "classnames";
import * as React from "react";
// import * as myClasses from "../";

import { ILibraryButtonProps, LibraryButton } from "src/library";

import "./styles.css";

export interface IStyledButtonProps extends ILibraryButtonProps {
  width?: number;
  height?: number;
  type?: string;
}

export const StyledButton: React.SFC<IStyledButtonProps> = props => {
  const {
    className,
    width,
    height,
    type,
    ...buttonProps
  } = props;

  const classes = classNames("styled-button", type, className);

  return (
    <LibraryButton
        className={classes} 
        {...buttonProps}
    />
  );
};
