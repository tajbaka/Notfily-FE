// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import { Classes } from 'src/mpd-library';

import { IToggleButtonsProps, StyledButton, ToggleButtons } from 'src/components';

import "./styles.css";

interface IBreadCrumbObj {
    text: string;
    pathname?: string;
}

interface IBreadCrumbsProps extends IProps {
    history?: any;
    toggleButtonProps?: IToggleButtonsProps;
    breadCrumbsList?: Array<IBreadCrumbObj>;
}

export const BreadCrumbs: React.SFC<IBreadCrumbsProps> = props => {
    const { breadCrumbsList, className, history, toggleButtonProps } = props;
    const classes = classNames('bread-crumbs', className);

    return (
        <div className={classes}>
            <ToggleButtons
                className={classes + '-toggle'}
                {...toggleButtonProps}
            />
            {breadCrumbsList && breadCrumbsList.map((breadCrumb: any, index: number) => (
                <div className={classes + '-bread-crumb-container'}>
                    <StyledButton
                        className={classNames(classes + '-button', (index === breadCrumbsList.length - 1) && Classes.ACTIVE)}
                        text={breadCrumb.text}
                        onClick={e => history.push(breadCrumb.pathname)}
                    />
                    {index !== breadCrumbsList.length - 1 && <Text className={classes + '-divider'}> / </Text>}
                </div>
            ))}
        </div>
    );
}

export default BreadCrumbs;
