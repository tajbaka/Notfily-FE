import * as classNames from "classnames";
import * as React from "react";
import * as myClasses from "src/mpd-library";

import {
  Classes,
  IPopoverProps,
  ITooltipProps,
  Popover,
  Position,
  Tooltip
} from "@blueprintjs/core";
import { IMPDButtonProps, IMPDStates, MPDButton, States } from "../";

import "./styles.css";

export interface ISideItemProps extends IMPDButtonProps {
  groupIndex?: number;
  itemIndex?: number;
  shouldActive?: boolean;
  activeGroupIndex?: number;
  activeItemIndex?: number;
  popOverProps?: IPopoverProps;
  toolTipProps?: ITooltipProps;
  ToolTipElement?: JSX.Element;
  toolTipActive?: boolean;
  path?: string;
  text?: string;
  history?: any;
  onItemClick?(event: any): void;
  onClick?(
    event: any,
    groupIndex?: number,
    itemIndex?: number,
    shouldActive?: boolean
  ): void;
}

export class MPDSideItem extends React.Component<ISideItemProps, IMPDStates> {
  constructor(props: ISideItemProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.state = {
      itemState: States.default
    };
  }

  public componentDidMount() {
    const {
      activeGroupIndex,
      activeItemIndex,
      groupIndex,
      itemIndex
    } = this.props;

    let itemState: States;

    if (activeGroupIndex === groupIndex && activeItemIndex === itemIndex) {
      itemState = States.selected;
    } else {
      itemState = States.default;
    }
    this.setState({ itemState });
  }

  public componentWillReceiveProps({
    activeGroupIndex,
    activeItemIndex,
    groupIndex,
    itemIndex
  }: ISideItemProps) {
    const { itemState } = this.state;

    if (activeGroupIndex === groupIndex && activeItemIndex === itemIndex) {
      this.setState({ itemState: States.selected });
    } else if (itemState === States.selected) {
      this.setState({ itemState: States.default });
    }
  }

  public render() {
    const {
      className,
      path,
      groupIndex,
      itemIndex,
      onItemClick,
      activeGroupIndex,
      activeItemIndex,
      shouldActive,
      text,
      history,
      popOverProps,
      toolTipProps,
      ToolTipElement,
      toolTipActive,
      ...newProps
    } = this.props;

    const { itemState } = this.state;

    const classes = classNames(
      myClasses.SIDEBAR_ITEM,
      myClasses.statesClass(itemState),
      Classes.BUTTON,
      className
    );

    return (
      <div
        onMouseEnter={this.onHover}
        onMouseLeave={this.onLeave}
        onClick={this.onClick}
        className={classes}
      >
        <Popover {...popOverProps}>
        {text && toolTipActive ?
          <Tooltip
            portalClassName={classNames(
              myClasses.SIDEBAR_TOOLTIP,
              text.replace(" ", "-")
            )}
            content={text}
            isOpen={itemState === States.hover}
            position={Position.LEFT}
          >
            <MPDButton {...newProps} text={text} itemState={itemState} />
          </Tooltip>
          :
          <MPDButton {...newProps} text={text} itemState={itemState} />
        }
        </Popover>
      </div>
    );
  }

  private onClick(event: any) {
    const {
      shouldActive,
      groupIndex,
      itemIndex,
      onClick,
      onItemClick,
      history,
      path
    } = this.props;

    if (onItemClick) {
      onItemClick(event);
    } else if (onClick) {
      onClick(event, groupIndex, itemIndex, shouldActive);
    }
    if (history) {
      history.push(path);
    }
  }

  private onHover(event: any) {
    if (this.state.itemState !== States.selected) {
      this.setState({ itemState: States.hover });
    }
  }

  private onLeave(event: any) {
    if (this.state.itemState !== States.selected) {
      this.setState({ itemState: States.default });
    }
  }
}
