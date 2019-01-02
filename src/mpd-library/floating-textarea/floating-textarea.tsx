import * as classNames from "classnames";
import * as React from "react";
import * as myClasses from "../";

import { Classes, ITextAreaProps, Text, TextArea } from "@blueprintjs/core";

import "./styles.css";

export interface IMPDFloatingTextAreaProps extends ITextAreaProps {
  maxCounter?: number;
  large?: boolean;
  focused?: boolean;
  type?: string;
}

interface IMPDFloatingTextAreaState {
  counter?: number;
  type?: string;
}

export class MPDFloatingTextArea extends React.Component<
  IMPDFloatingTextAreaProps,
  IMPDFloatingTextAreaState
> {
  public static defaultProps: IMPDFloatingTextAreaProps = {
    placeholder: "Filler Placeholder"
  };

  private textarea: React.RefObject<any>;

  constructor(props: IMPDFloatingTextAreaProps) {
    super(props);
    this.textarea = React.createRef();
    this.setFocus = this.setFocus.bind(this);
    this.onChange = this.onChange.bind(this);

    const { type } = this.props;

    this.state = {
      counter: undefined,
      type: type || "mpd-default"
    };
  }

  public componentWillReceiveProps({ focused }: IMPDFloatingTextAreaProps) {
    if (focused !== undefined && focused !== this.props.focused) {
      this.setFocus(focused);
    }
  }

  public render() {
    const {
      className,
      large,
      placeholder,
      onChange,
      maxCounter,
      ...newProps
    } = this.props;

    const { counter, type } = this.state;
    const classes = classNames(
      myClasses.FLOATING_TEXTAREA_CONTAINER,
      type,
      large && Classes.LARGE,
      className
    );

    return (
      <div className={classes} tabIndex={-1}>
        <TextArea
          onChange={this.onChange}
          required={true}
          ref={this.textarea}
          maxLength={maxCounter}
          {...newProps}
        />
        <span className={myClasses.FLOATING_TEXTAREA_LABEL}>{placeholder}</span>
        {maxCounter && (
          <Text className={myClasses.FLOATING_TEXTAREA_COUNTER}>
            {counter}/{maxCounter}
          </Text>
        )}
      </div>
    );
  }

  private onChange(event: any) {
    const { onChange } = this.props;
    const counter = event.currentTarget.value.length;
    this.setState({ counter });
    if (onChange) {
      onChange(event);
    }
  }

  private setFocus(state: boolean) {
    if (this.textarea.current) {
      if (state) {
        this.textarea.current.focus();
      } else {
        this.textarea.current.blur();
      }
      return state;
    }
    return;
  }
}
