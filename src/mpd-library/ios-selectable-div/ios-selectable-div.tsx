// tslint:disable
import * as React from "react";

import { HTMLDivProps } from "@blueprintjs/core";

import "./styles.css";

export interface IMPDIOSSelectableDivState {
  iosSelectable?: boolean;
}

export class MPDIOSSelectableDiv extends React.Component<
  HTMLDivProps,
  IMPDIOSSelectableDivState
> {
  constructor(props: HTMLDivProps) {
    super(props);

    let iosSelectable = false;

    if (/iP(hone|ad)/.test(window.navigator.userAgent)) {
      iosSelectable = true;
    }

    this.state = {
      iosSelectable
    };
  }

  public componentDidMount() {
    if (this.state.iosSelectable) {
      document.addEventListener("touchstart", () => {});
    }
  }

  public render() {
    const { children, className, ...newProps } = this.props;

    return (
      <div className={className} {...newProps}>
        {children}
      </div>
    );
  }
}
