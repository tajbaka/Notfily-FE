import * as classNames from "classnames";
import * as React from "react";

import { ILibrarySelectProps, LibrarySelect } from "src/library";

import { Text } from "@blueprintjs/core";

import "./styles.css";

export interface IStyledSelectProps extends ILibrarySelectProps{
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
      <LibrarySelect  {...newProps} />
    </div>
  );
};
