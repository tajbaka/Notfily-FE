import * as React from "react";

import {
  Classes,
  IMPDHiddenScrollContainerProps,
  Justify,
  MPDHiddenScrollContainer
} from "src/mpd-library/";

import * as classNames from "classnames";

import "./styles.css";

export interface IMPDSideBarGroupProps extends IMPDHiddenScrollContainerProps {
  groupIndex?: number;
  activeGroupIndex?: boolean;
  justify?: Justify;
}

export class MPDSideBarGroup extends React.Component<IMPDSideBarGroupProps> {
  public static defaultProps: IMPDSideBarGroupProps = {
    justify: "top",
    yDirection: false,
    xDirection: false
  };

  constructor(props: IMPDSideBarGroupProps) {
    super(props);
  }

  public render() {
    const {
      justify,
      className,
      children,
      xDirection,
      yDirection,
      ...newProps
    } = this.props;

    const childrenWithProps = React.Children.map(
      children,
      (child: React.ReactElement<any>, itemIndex) =>
        React.cloneElement(child, { itemIndex, ...newProps })
    );

    const classes = classNames(
      Classes.SIDEBAR_GROUP,
      Classes.justifyClass(justify),
      className
    );

    return (
      <MPDHiddenScrollContainer
        className={classes}
        xDirection={xDirection}
        yDirection={yDirection}
      >
        {childrenWithProps}
      </MPDHiddenScrollContainer>
    );
  }
}
