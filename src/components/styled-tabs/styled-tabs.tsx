import * as classNames from "classnames";
import * as React from "react";

import { IProps, ITabsProps, Tab, Tabs } from '@blueprintjs/core';

import "./styles.css";

interface IStyledTabsProps extends IProps {
  panel?: JSX.Element;
  tabs: Array<string>;
  tabsProps?: ITabsProps;
  type?: string;
}

export const StyledTabs: React.SFC<IStyledTabsProps> = props => {
  const { className, tabs, tabsProps, type, panel } = props;

  const classes = classNames('styled-tabs', type, className);

  return (
    <React.Fragment>
    <Tabs
      className={classes}
      id={'styled-tabs'}
      {...tabsProps}
    >
      {tabs.map((title: any, index: number) => (
        <Tab
          id={index}
          key={index}
          title={title}
          panel={tabsProps && tabsProps.selectedTabId === index ? panel : undefined}
        />
      ))}
      <hr className='test'/>
    </Tabs>
    </React.Fragment>
  );
};
