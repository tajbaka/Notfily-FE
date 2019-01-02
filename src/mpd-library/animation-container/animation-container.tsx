// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps } from "@blueprintjs/core";

import "./styles.css";

export const MPDAnimations = {
  growOut: "transition" as "transition"
};

export type MPDAnimations = typeof MPDAnimations[keyof typeof MPDAnimations];

export interface IMPDAnimationContainerProps extends IProps {
  animationActive?: boolean;
  animation: MPDAnimations;
  duration?: number; // in milliseconds
}

interface IMPDAnimationContainerState {
  style?: React.CSSProperties;
}

export class MPDAnimationContainer extends React.Component<
  IMPDAnimationContainerProps,
  IMPDAnimationContainerState
> {
  constructor(props: IMPDAnimationContainerProps) {
    super(props);
    this.mountStyle = this.mountStyle.bind(this);

    const { animation, duration } = this.props;

    const style = this.mapStartingAnimation(animation, duration || 300);

    this.state = {
      style
    };
  }

  public componentDidMount() {
    setTimeout(this.mountStyle, 10);
  }

  public render() {
    const { className, children, animationActive } = this.props;
    let style;
    const classes = classNames("animation-container", className);

    if (animationActive === undefined || animationActive) {
      style = this.state.style;
    }

    return (
      <div className={classes} style={style}>
        {children}
      </div>
    );
  }

  private mapStartingAnimation(
    animation: MPDAnimations,
    duration: number
  ): React.CSSProperties {
    switch (animation) {
      case MPDAnimations.growOut:
        return {
          transform: "scale(0)",
          transition: `transform ${duration / 1000}s ease`
        };
    }
  }

  private mapEndingAnimation(
    animation: MPDAnimations,
    duration: number
  ): React.CSSProperties {
    switch (animation) {
      case MPDAnimations.growOut:
        return {
          transform: "scale(1)",
          transition: `transform ${duration / 1000}s ease`
        };
    }
  }

  private mountStyle() {
    const { animation, duration } = this.props;
    const style = this.mapEndingAnimation(animation, duration || 300);
    this.setState({
      style
    });
  }
}
