// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { Classes } from "src/mpd-library/";

import { IProps } from "@blueprintjs/core";

import "./styles.css";

export interface ILeftPanelContainerProps extends IProps {
    collapsed?: boolean;
    overlayVisible?: boolean;
    scrollRef?: any; 
    mobileSideBarActive?: boolean;
    onOverlayClick?:(event: any) => void;
}

export class LeftPanelContainer extends React.Component<ILeftPanelContainerProps> {
    // export const : React.SFC<ILeftPanelContainerProps> = props => {
    public render() {
        const { className, scrollRef, children, collapsed, onOverlayClick, overlayVisible, mobileSideBarActive } = this.props;
        return (
            <div ref={scrollRef} className={classNames('left-panel-container', collapsed && Classes.COLLAPSED, mobileSideBarActive && "sidebar-" + Classes.ACTIVE, className)}>
                <div className={classNames('left-panel-overlay', overlayVisible && Classes.ACTIVE)} onClick={onOverlayClick} /> 
                { children }
            </div>
        );
    }
};
