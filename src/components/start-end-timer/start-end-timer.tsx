// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps } from "@blueprintjs/core";

import { StyledSelect } from 'src/components';

import { IMPDSelectProps, MPDSelectTypes } from 'src/mpd-library';

import "./styles.css";

export interface IStartEndTimerProps extends IProps {
    startTimeProps?: IMPDSelectProps;
    endTimeProps?: IMPDSelectProps;
}

export const StartEndTimer: React.SFC<IStartEndTimerProps> = props => {
    const { className, startTimeProps, endTimeProps } = props;
    const classes = 'start-end-timer';
    return (
        <div className={classNames(classes, className)}>
            <StyledSelect
                type={MPDSelectTypes.default}
                {...startTimeProps as any}
            />
            <hr className={classes + '-seperator'} />
             <StyledSelect
                type={MPDSelectTypes.default}
                {...endTimeProps as any}
            />
        </div>
    );
}

export default StartEndTimer;
