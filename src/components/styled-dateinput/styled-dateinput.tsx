import * as classNames from "classnames";
import * as React from "react";

import { DateInput, IDateInputProps } from "@blueprintjs/datetime";

import { IMPDIconProps, MPDIcon } from "src/mpd-library";

import "./styles.css";

export interface IStyledDateInputProps extends IDateInputProps {
  dateInputType?: string;
  leftIconProps?: IMPDIconProps;
  rightIconProps?: IMPDIconProps;
}

export const StyledDateInput: React.SFC<IStyledDateInputProps> = props => {
  const {
    className,
    leftIconProps, 
    rightIconProps,
    dateInputType,
    ...dateInputProps
  } = props;

  const classes = "styled-dateinput";

  return (
    <div className={classNames(classes + '-container', dateInputType, className)}>
        {leftIconProps &&
            <MPDIcon className={classes + '-left-icon'} {...leftIconProps} />
        }
        <DateInput
            className={classes}
            {...dateInputProps}
        />
        {rightIconProps &&
            <MPDIcon className={classes + '-right-icon'} {...rightIconProps} />
        }
    </div>
  );
};
