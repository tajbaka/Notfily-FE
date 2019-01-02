import { Dispatch } from "redux";

import { IProps } from "@blueprintjs/core";

export const Severities = {
  severe: "severe" as "severe",
  moderate: "moderate" as "moderate",
  minor: "minor" as "minor",
  extreme: "extreme" as "extreme"
};

export type Severities = typeof Severities[keyof typeof Severities];

export const State = {
  HOVER: "hover" as "hover",
  SELECT: "select" as "select",
  ACTIVE: "active" as "active"
};

export type State = typeof State[keyof typeof State];

export type DescriptionDataType = {
  title?: string;
  description?: string;
  subTitles?: Array<ContentSubtitleType>;
};

export type ContentSubtitleType = {
  header?: string;
  title?: string;
};

export type alertSystems = {
  twitter?: Array<any>;
  facebook?: Array<any>;
  iPaws?: Array<any>;
};

export type TextDataType = {
  name?: string;
  iconName?: string;
};

export type AlertContentDataType = {
  analytics?: AlertContentAnalytics;
  details?: AlertContentDetails;
  description?: string;
  instructions?: string;
  xCoord?: number;
  yCoord?: number;
};

export type AlertContentAnalytics = {
  replies: string;
  views: string;
  reach: string;
};

export type AlertContentDetails = {
  sentOn?: string;
  expires?: string;
  severity?: string;
  urgency?: string;
  certainty?: string;
  sentBy?: string;
  area?: string;
  agency?: string;
  alertType?: string;
  status?: string;
  anotherItem?: string;
  bigItem?: string;
};

export const AudienceTypes = {
  private: "private" as "private",
  public: "public" as "public"
};

export type AudienceTypes = typeof AudienceTypes[keyof typeof AudienceTypes];

export interface IDetailView extends IProps {
  routeProps: any;
  onUpdateToolBar: (
    topBarProps: any
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onCloseRightPanel?(): void;
  onToggleRightPanel?(): void;
}

export interface IDefaultView {
  isMobileSize: boolean;
  mobileSideBarActive?: boolean;
  routeProps?: any;
  windowHeight: number;
  rightPanelExpanded: boolean;
  topBarProps: any;
  onCloseRightPanel: (
    pathname: string,
    history: any
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onToggleMobileSideBar: () => (dispatch: Dispatch<any>) => Promise<void>;
  onToggleRightPanel: () => (dispatch: Dispatch<any>) => Promise<void>;
  onUpdateToolBar: (
    topBarProps: any
  ) => (dispatch: Dispatch<any>) => Promise<void>;
}
