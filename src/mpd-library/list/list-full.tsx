import * as React from "react";

import { IMPDHiddenScrollContainerProps, MPDHiddenScrollContainer } from 'src/mpd-library';

import { IProps } from "@blueprintjs/core";

export interface IMPDListFullProps extends IProps {
  Component?: React.ComponentType<any>;
  list: Array<any>;
  onScrollBottom?:(event: any) => void;
  hiddenScrollProps?: IMPDHiddenScrollContainerProps;
}

export const MPDListFull: React.SFC<IMPDListFullProps> = props => {
  const { className, Component, list, onScrollBottom, hiddenScrollProps, ...componentProps } = props;

  return (
    <React.Fragment>
      {Component &&
      <MPDHiddenScrollContainer className={className} onScrollBottom={onScrollBottom} yDirection={true} {...hiddenScrollProps} >
        <Component list={list} {...componentProps}/>
      </MPDHiddenScrollContainer>
      }
    </React.Fragment>
  );
};

// create on scroll down event to load next 10 elements