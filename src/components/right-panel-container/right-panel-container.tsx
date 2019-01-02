// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { Classes, IMPDAnimationContainerProps, MPDAnimationContainer } from "src/mpd-library/";

import { IProps } from "@blueprintjs/core";

import "./styles.css";

export interface IRightPanelContainerProps extends IProps {
    animationProps?: IMPDAnimationContainerProps; 
    expanded?: boolean;
}

export class RightPanelContainer extends React.Component<IRightPanelContainerProps> {
    public render() {
        const { className, children, expanded, animationProps } = this.props;
        return (
            <MPDAnimationContainer
                className={classNames('right-panel-container', expanded && Classes.EXPANDED,  className)}
                {...animationProps as any}
            >
            { children }
            </MPDAnimationContainer>
        );
    }
};
