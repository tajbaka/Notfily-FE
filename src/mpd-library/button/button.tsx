import * as classNames from "classnames";
import * as React from "react";
import * as myClasses from "../";

import {
  Alignment,
  Button,
  Classes,
  IButtonProps,
  Text
} from "@blueprintjs/core";

import { IMPDIconProps, Justify, MPDIcon, States, TestIcon } from "../";

import "./styles.css";

export interface IMPDButtonProps extends IButtonProps, IMPDIconProps {
  text?: string;
  alignIcon?: Alignment;
  justifyIcon?: Justify;
  width?: number;
  height?: number;
  useTest?: boolean;
}

interface IMPDButtonState {
  buttonState?: States;
  align: Alignment;
  justify: Justify;
}

export class MPDButton extends React.Component<
  IMPDButtonProps,
  IMPDButtonState
> {
  constructor(props: IMPDButtonProps) {
    super(props);
    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    const { alignIcon, justifyIcon, itemState } = this.props;
    this.state = {
      align: alignIcon || Alignment.LEFT,
      justify: justifyIcon || Justify.CENTER,
      buttonState: itemState || States.unselected
    };
  }

  public componentWillReceiveProps(nextProps: IMPDButtonProps) {
    if(nextProps.itemState !== this.props.itemState){
      this.setState({ buttonState: nextProps.itemState });
    }
  }

  public render() {
    const {
      className,
      name,
      hoverName,
      selectName,
      text,
      tabIndex,
      alignIcon,
      justifyIcon,
      width,
      height,
      useTest,
      onClick,
      itemState,
      ...newProps
    } = this.props;

    const { align, buttonState, justify } = this.state;

    const classes = classNames(
      myClasses.BUTTON,
      Classes.alignmentClass(align),
      myClasses.justifyClass(justify),
      name !== undefined && text !== undefined && "full-button",
      className
    );

    if(useTest){
      return (
        <Button
          style={{ height, width }}
          className={classes}
          tabIndex={tabIndex}
          onClick={this.onClick}
          onMouseEnter={this.onHover}
          onMouseLeave={this.onLeave}
          {...newProps}
        >
          <React.Fragment>
            {(buttonState === States.default || buttonState === undefined || buttonState === States.unselected || (hoverName === undefined && selectName === undefined))  && <TestIcon name={name} />}
            {buttonState === States.hover && <TestIcon name={hoverName} />}
            {buttonState === States.selected && <TestIcon name={selectName} />}
          </React.Fragment>
          
          {text !== undefined && (
            <Text className={myClasses.BUTTON_TEXT}> {text} </Text>
          )}
        </Button>
      );
    }

    return (
      <Button
        className={classes}
        style={{ height, width }}
        tabIndex={tabIndex}
        onClick={this.onClick}
        {...newProps}
      >
        {name !== undefined && (
          <MPDIcon
            tabIndex={tabIndex}
            name={name}
            hoverName={hoverName}
            selectName={selectName}
            itemState={buttonState}
          />
        )}
        {text !== undefined && (
          <Text className={myClasses.BUTTON_TEXT}> {text} </Text>
        )}
      </Button>
    );
  }

  private onClick(event: any) {
    const { onClick } = this.props;
    if(onClick) {
      this.setState({ buttonState: States.selected }, () => {
        onClick(event);
      })
    }
  }

  private onHover() {
    if (this.state.buttonState !== States.selected) {
      this.setState({ buttonState: States.hover });
    }
  }

  private onLeave() {
    if (this.state.buttonState !== States.selected) {
      this.setState({ buttonState: States.default });
    }
  }
}
