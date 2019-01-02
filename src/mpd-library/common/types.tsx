import { HTMLDivProps } from "@blueprintjs/core";

export interface IMPDSelectableItem {
  itemId?: string | number;
  selected?: boolean;
  onItemClick?(event: React.MouseEvent<HTMLElement>): void;
}

export interface IMPDTextDataType extends HTMLDivProps {
  name?: string;
  iconName?: string;
}

export interface IMPDStates {
  itemState?: States;
}

export const Justify = {
  CENTER: "center" as "center",
  TOP: "top" as "top",
  BOTTOM: "bottom" as "bottom"
};

export type Justify = typeof Justify[keyof typeof Justify];

export const Alignment = {
  CENTER: "center" as "center",
  LEFT: "left" as "left",
  RIGHT: "right" as "right"
};

export type Alignment = typeof Alignment[keyof typeof Alignment];

export const Severities = {
  severe: "severe" as "severe",
  moderate: "moderate" as "moderate",
  minor: "minor" as "minor",
  extreme: "extreme" as "extreme"
};

export type Severities = typeof Severities[keyof typeof Severities];

export const States = {
  hover: "hover" as "hover",
  selected: "selected" as "selected",
  unselected: "unselected" as "unselected",
  default: "default" as "default"
};

export type States = typeof States[keyof typeof States];

export const MPDSelectTypes = {
  default: "default" as "default",
  staticText: "staticText" as "staticText",
  staticIcon: "staticIcon" as "staticIcon",
  images: "images" as "images"
};

export type MPDSelectTypes = typeof MPDSelectTypes[keyof typeof MPDSelectTypes];
