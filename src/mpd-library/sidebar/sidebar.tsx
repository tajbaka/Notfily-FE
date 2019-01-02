import * as classNames from "classnames";
import * as React from "react";
import * as myClasses from "../";

import { Classes, IProps } from "@blueprintjs/core";

import "./styles.css";

export interface IMPDSideBarProps extends IProps {
  active?: boolean;
  history?: any;
  homeGroupIndex?: number;
  homeItemIndex?: number;
}

export interface IMPDSideBarState extends IProps {
  activeGroupIndex?: number;
  activeItemIndex?: number;
}

export class MPDSideBar extends React.Component<
  IMPDSideBarProps,
  IMPDSideBarState
> {
  constructor(props: IMPDSideBarProps) {
    super(props);
    const { homeGroupIndex, homeItemIndex } = this.props;

    this.state = {
      activeGroupIndex: homeGroupIndex,
      activeItemIndex: homeItemIndex
    };
  }

  public componentWillReceiveProps({ homeGroupIndex, homeItemIndex }: IMPDSideBarProps) {
    if(homeGroupIndex !== this.props.homeGroupIndex){
      this.setState({activeGroupIndex: homeGroupIndex});
    }
    if(homeItemIndex !== this.props.homeItemIndex) {
      this.setState({activeItemIndex: homeItemIndex});
    }
  }

  public render() {
    const { active, className, children, history } = this.props;
    const { activeGroupIndex, activeItemIndex } = this.state;

    let state;

    if (active) {
      state = Classes.ACTIVE;
    } else {
      state = undefined;
    }

    const classes = classNames(myClasses.SIDEBAR, className, state);
    this.handleNavClick = this.handleNavClick.bind(this);

    const childrenWithProps = React.Children.map(
      children,
      (child: React.ReactElement<any>, groupIndex: number) =>
        React.cloneElement(child, {
          activeGroupIndex,
          activeItemIndex,
          groupIndex,
          history,
          onClick: this.handleNavClick
        })
    );
    return (
      <div className={classes}>
        <div className={myClasses.SIDEBAR_GROUP_CONTAINER}>
          {childrenWithProps}
        </div>
      </div>
    );
  }

  private handleNavClick(
    event: React.MouseEvent<HTMLElement>,
    groupID: number,
    itemID: number,
    shouldActive: boolean,
    onClick: any
  ) {
    if (shouldActive === undefined) {
      this.setState({ activeGroupIndex: groupID, activeItemIndex: itemID });
    } else {
      const { homeGroupIndex, homeItemIndex } = this.props;
      this.setState({
        activeGroupIndex: homeGroupIndex,
        activeItemIndex: homeItemIndex
      });
    }
    if (onClick) {
      onClick(event);
    }
  }
}
