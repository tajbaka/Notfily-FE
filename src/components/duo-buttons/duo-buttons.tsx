import * as classNames from "classnames";
import * as React from "react";
// import * as myClasses from "../";

import { IProps } from "@blueprintjs/core";

import { MPDButton } from "src/mpd-library";

import "./styles.css";

export interface IDuoButtonsProps extends IProps {
  firstButtonText?: string;
  secondButtonText?: string;
  height?: number;
  dataId?: string;
  firstButtonClick?(event: any): void;
  secondButtonClick?(event: any): void;
}

export const DuoButtons: React.SFC<IDuoButtonsProps> = props => {
  const {
    className,
    firstButtonClick,
    dataId,
    secondButtonClick,
    firstButtonText,
    secondButtonText
  } = props;

  const classes = classNames("duo-button-container", className);

  return (
    <div className={classes}>
      <MPDButton
        data-id={dataId}
        text={firstButtonText}
        onClick={firstButtonClick}
      />
      <MPDButton
        data-id={dataId}
        text={secondButtonText}
        onClick={secondButtonClick}
      />
    </div>
  );
};
