// tslint:disable
import * as classNames from "classnames";
import * as React from "react";
import Measure, { BoundingRect } from "react-measure";

import * as myClasses from "src/mpd-library";
import { HTMLDivProps } from "@blueprintjs/core";

import "./styles.css";

export interface IMPDHiddenScrollContainerProps extends HTMLDivProps {
  yDirection?: boolean;
  xDirection?: boolean;
  onScroll?: (event: any) => void;
  onScrollTop?: (event: any) => void;
  onScrollBottom?: (event: any) => void;
  scrollRef?: any;
}

interface IMPDHiddenScrollContainerState {
  contentRect?: any;
  outerDiv?: BoundingRect;
  innerDiv?: BoundingRect;
  isFirefox?: boolean;
  scrollWidth?: number;
  scrollHeight?: number;
}

export class MPDHiddenScrollContainer extends React.Component<
  IMPDHiddenScrollContainerProps,
  IMPDHiddenScrollContainerState
> {

  constructor(props: IMPDHiddenScrollContainerProps) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    const isFirefox = window.navigator.appCodeName === "Mozilla";
    
    this.state = {
      outerDiv: undefined,
      innerDiv: undefined,
      isFirefox,
      scrollWidth: 0,
      scrollHeight: 0
    };
  }

  public render() {
    const { children, className, xDirection, yDirection, scrollRef } = this.props;
    const classes = classNames(
      myClasses.SCROLLABLE_DIV_CONTAINER,
      className,
      xDirection && "x-direction",
      yDirection && "y-direction"
    );

    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ outerDiv: contentRect.bounds, contentRect }, () => {
            this.getScrollWidth();
          });
        }}
      >
        {({ measureRef }) => (
          <div
            className={classes}
            ref={scrollRef}
            onScroll={this.onScroll}
            style={{
              marginRight: yDirection ? this.state.scrollWidth : undefined,
              marginBottom: xDirection ? this.state.scrollHeight : undefined
            }}
          >
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({ innerDiv: contentRect.bounds });
              }}
            >
              {({ measureRef }) => (
                <div
                  className={myClasses.SCROLLABLE_DIV_INNER_CONTAINER}
                  ref={measureRef}
                />
              )}
            </Measure>
            {children}
          </div>
        )}
      </Measure>
    );
  }

  private getScrollWidth() {
    const { outerDiv, innerDiv, isFirefox } = this.state;
    const { xDirection, yDirection } = this.props;
    if (outerDiv && innerDiv && isFirefox && yDirection) {
      const scrollWidth = innerDiv.width - outerDiv.width;
      this.setState({ scrollWidth });
    }
    if (outerDiv && innerDiv && isFirefox && xDirection) {
      const scrollHeight = innerDiv.height - outerDiv.height;
      this.setState({ scrollHeight });
    }
  }

  private onScroll(e: any) {
    const { onScrollBottom, onScrollTop, onScroll } = this.props;
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const top = e.target.scrollTop === 0;
    // console.log(this.state.contentRect);
    if(onScroll){
      onScroll(e);
    }
    if(onScrollBottom && bottom){
      onScrollBottom(e);
    }
    else if(onScrollTop && top){
      onScrollTop(e);
    }
  }
}
