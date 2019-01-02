// tslint:disable jsx-no-lambda
// import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import {  MPDButton, MPDHiddenScrollContainer } from "src/mpd-library";

import { LeftPanelContainer } from 'src/components';

import "./styles.css";

export interface ISettingsLeftPanelSettingsProps extends IProps {
  onToggleMobileSideBar?:(event: any) => void;
  mobileSideBarActive?: boolean;
  rightPanelExpanded: boolean;
  title?: string;
}

export const SettingsLeftPanel: React.SFC<ISettingsLeftPanelSettingsProps> = props => {
    const { children, mobileSideBarActive, onToggleMobileSideBar, rightPanelExpanded, title } = props;
    return (
      <LeftPanelContainer
        className='settings-left-panel-container'
        collapsed={rightPanelExpanded}
        mobileSideBarActive={mobileSideBarActive}
        overlayVisible={mobileSideBarActive}
        onOverlayClick={onToggleMobileSideBar}
        >
        <div className='settings-left-panel-header'>
          <MPDButton
            name="content-view--header--toggle-menu"
            onClick={onToggleMobileSideBar}
          />
          <Text className='settings-left-panel-title'> {title} </Text>
        </div>
        <hr className='settings-left-panel-border' />
        <MPDHiddenScrollContainer className='settings-left-panel-children-container' yDirection={true}>
            {children}
        </MPDHiddenScrollContainer>
      </LeftPanelContainer>
    );
}

export default SettingsLeftPanel;
