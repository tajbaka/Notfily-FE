// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { ILibraryInputProps, LibraryFloatingInput, LibraryInput } from "src/library";

import { Text } from "@blueprintjs/core";

import "./styles.css";

export interface IStyledInputProps extends ILibraryInputProps {
  error?: string;
  floatingType?: string;
  moreInfo?: string;
  inputRef?: any;
  inputType?: string;
}

export const StyledInput: React.SFC<IStyledInputProps> = props => {
  const { className, error, floatingType, moreInfo, inputType, ...remaining } = props;

  const classes = classNames(
    "styled-input-container",
    floatingType,
    className
  );

  return (
    <div className={classes}>
      {(inputType === 'default' || inputType === undefined) &&
        <LibraryInput {...remaining} />
      }
      {inputType === 'floating' &&
        <LibraryFloatingInput {...remaining} />
      }
      {moreInfo &&
      <Text className={classNames("more-info", moreInfo && 'active')}>
        {moreInfo}
      </Text>
      }
      {error &&
      <Text className={classNames("error", error && 'active')}>
        {error}
      </Text>
      }
    </div>
  );
};
