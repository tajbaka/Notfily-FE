// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import { MPDIcon } from 'src/mpd-library';

import "./styles.css";

export interface IAccountSettingsInfoItemProps extends IProps {
  icon?: string;
  text?: string;
}

export const AccountSettingsInfoItem: React.SFC<IAccountSettingsInfoItemProps> = props => {
    const { className, icon, text } = props;
    const classes = classNames('account-settings-info-item', className);
    return (
        <div className={classes}>
            <div className={classes + '-image'}>
                <MPDIcon name={icon} />
            </div>
            <Text className={classes + '-text'}> { text } </Text>
        </div>
    );
}

export default AccountSettingsInfoItem;
