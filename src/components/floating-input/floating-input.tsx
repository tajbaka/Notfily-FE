// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import {
  Classes,
  IMPDFloatingInputProps,
  MPDFloatingInput
} from "src/mpd-library";

import { Text } from "@blueprintjs/core";

import "./styles.css";

export interface IFloatingInputProps extends IMPDFloatingInputProps {
  error?: string;
  floatingType?: string;
  moreInfo?: string;
  inputRef?: any;
}

export const FloatingInput: React.SFC<IFloatingInputProps> = props => {
  const { className, error, floatingType, moreInfo, ...remaining } = props;

  const classes = classNames(
    "floating-input-container",
    floatingType,
    className
  );

  return (
    <div className={classes}>
      <MPDFloatingInput {...remaining} />
      {moreInfo &&
      <Text className={classNames("more-info", moreInfo && Classes.ACTIVE)}>
        {moreInfo}
      </Text>
      }
      {error &&
      <Text className={classNames("error", error && Classes.ACTIVE)}>
        {error}
      </Text>
      }
    </div>
  );
};
