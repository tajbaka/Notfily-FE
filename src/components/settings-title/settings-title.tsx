// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import "./styles.css";

interface ISettingsTitleProps extends IProps {
  title?: string;
}

export const SettingsTitle: React.SFC<ISettingsTitleProps> = props => {
    const { className, title } = props;
    const classes = classNames('settings-title', className);
    return (
        <Text className={classes}> { title } </Text>
    );
}

export default SettingsTitle;
