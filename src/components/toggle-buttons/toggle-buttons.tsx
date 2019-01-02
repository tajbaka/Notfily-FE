import * as classNames from "classnames";
import * as React from "react";
// import * as myClasses from "../";

import { IProps } from "@blueprintjs/core";

import { MPDButton } from "src/mpd-library";

import "./styles.css";

export interface IToggleButtonsProps extends IProps {
  label?: string;
  hideExitButton?: boolean;
  onToggle?(event: any): void;
  onClose?(event: any): void;
}

export const ToggleButtons: React.SFC<IToggleButtonsProps> = props => {
  const { className, hideExitButton, onToggle, onClose } = props;
  const classes = classNames("toggle-buttons-container", className);

  return (
    <div className={classes}>
      {!hideExitButton && (
        <MPDButton
          onClick={onClose}
          name={"compose-view--header--exit"}
          className={classNames("closebutton")}
        />
      )}
      <MPDButton
        onClick={onToggle}
        name={"content-view--header--toggle-menu"}
        className="togglebutton"
      />
      {/* {label && <Text className="label"> {label} </Text>} */}
    </div>
  );
};
