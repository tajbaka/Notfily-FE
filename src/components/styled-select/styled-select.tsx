import * as classNames from "classnames";
import * as React from "react";

import { IMPDSelectProps, MPDSelect } from "src/mpd-library";

import { Text } from "@blueprintjs/core";

import "./styles.css";

export interface IStyledSelectProps extends IMPDSelectProps{
  type?: string;
  label?: string;
}

export const StyledSelect: React.SFC<IStyledSelectProps> = props => {
  const { className, type, label, ...newProps } = props;
  const classes = type;

  return (
    <div className={classNames(type, className)}>
      {label && 
        <Text className={classes + '-label'}> { label } </Text>
      }
      <MPDSelect  {...newProps} />
    </div>
  );
};
