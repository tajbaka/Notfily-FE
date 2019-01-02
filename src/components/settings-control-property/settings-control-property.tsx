// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps, ISwitchProps, Text } from "@blueprintjs/core";

import { StyledSwitch } from 'src/components';

import "./styles.css";

export interface ISettingsControlPropertyProps extends IProps {
  title?: string;
  subtitle?: string;
  switchProps?: ISwitchProps;
}

export const SettingsControlProperty: React.SFC<ISettingsControlPropertyProps> = props => {
  const { className, title, subtitle, switchProps } = props;

  const classes = 'settings-control-property';

  return (
      <div className={classNames(classes, className)}>
        <Text className={classes + '-title'}> { title } </Text>
        <div className={classes + '-wrapper'}>
            <StyledSwitch label='' {...switchProps} />
            <Text className={classes + '-sub-title'}> {subtitle} </Text>
        </div>
      </div>
  );
}

export default SettingsControlProperty;
