// tslint:disable
import * as classNames from "classnames";
import * as React from "react";

import { HTMLDivProps } from "@blueprintjs/core";

import "./styles.css";

export interface IMultiLineTextProps extends HTMLDivProps {
  text: string;
  charLimit?: number;
}

interface IMultiLineTextState {
  text: string;
}

export class MPDMultiLineText extends React.Component<
  IMultiLineTextProps,
  IMultiLineTextState
> {
  constructor(props: IMultiLineTextProps) {
    super(props);
    this.formatText = this.formatText.bind(this);
    const text = this.formatText(props.text);
    this.state = {
      text
    };
  }

  public componentWillReceiveProps(props: IMultiLineTextProps) {
    if (this.state.text !== props.text) {
      const text = this.formatText(props.text);
      this.setState({ text });
    }
  }

  public render() {
    const { className } = this.props;
    const { text } = this.state;

    const classes = classNames("multi-line-text-container", className);

    return <div className={classes}>{text}</div>;
  }

  private formatText(text: string) {
    const { charLimit } = this.props;
    if (charLimit && text && text.length > charLimit - 3) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  }
}
