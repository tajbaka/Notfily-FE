// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";
import * as Classes from "../";

import "./styles.css";

import { HTMLInputProps, Text } from "@blueprintjs/core";

export interface IMPDFloatingInputProps extends HTMLInputProps {
  focus?: boolean;
  maxCounter?: number;
  inputRef?: any;
  fixedPlaceholder?: string;
}

interface IMPDFloatingInputState {
  counter?: number;
  invisibleDivWidth?: number;
}

export class MPDFloatingInput extends React.Component<
  IMPDFloatingInputProps,
  IMPDFloatingInputState
> {
  public static defaultProps: HTMLInputProps = {
    placeholder: "Filler Placeholder"
  };

  private input: React.RefObject<HTMLInputElement>;

  private invisibleInput: React.RefObject<HTMLDivElement>;

  constructor(props: HTMLInputProps) {
    super(props);
    this.input = React.createRef();
    this.invisibleInput = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.setFocus = this.setFocus.bind(this);

    const { value } = this.props;
    let counter;
    
    if(value) {
      counter = value.toString().length;
    }

    this.state = {
      counter
    };
  }

  public componentDidMount() {
    const { focus } = this.props;
    if (focus !== undefined) {
      this.setFocus(focus);
    }
  }

  public componentWillReceiveProps({ focus, value }: IMPDFloatingInputProps) {
    if (focus !== undefined && focus !== this.props.focus) {
      this.setFocus(focus);
    }
  }

  public render() {
    const {
      className,
      placeholder,
      focus,
      fixedPlaceholder,
      maxCounter,
      onChange,
      value,
      inputRef,
      ...newProps
    } = this.props;

    const { counter, invisibleDivWidth } = this.state;

    const classes = classNames(Classes.FLOATING_INPUT_CONTAINER, className);

    return (
      <div className={classes} tabIndex={-1}>
        <input
          required={true}
          value={value ? value : undefined}
          ref={inputRef || this.input}
          onChange={this.onChange}
          maxLength={maxCounter}
          {...newProps}
        />
        {fixedPlaceholder &&
          <React.Fragment>
            <div className={classNames(Classes.FLOATING_INPUT_INVISIBLE, className)} ref={ this.invisibleInput }>
              { value }
            </div>
            <div className={Classes.FLOATING_INPUT_FIXED_PLACEHOLDER} style={{ left: invisibleDivWidth ? invisibleDivWidth : 0 }}>
              { fixedPlaceholder }
            </div>
          </React.Fragment>
        }
        <span className={Classes.FLOATING_INPUT_LABEL} tabIndex={-1}>
          {placeholder}
        </span>
        {maxCounter && (
          <Text className={Classes.FLOATING_INPUT_COUNTER}>
            {counter}/{maxCounter}
          </Text>
        )}
      </div>
    );
  }

  private onChange(event: any) {
    const { onChange } = this.props;
    const counter = event.currentTarget.value.length;

    setTimeout(() => {
        if(this.invisibleInput.current) {
        const invisibleDivWidth = this.invisibleInput.current.clientWidth;
        if(counter === 0 ){
          this.setState({ invisibleDivWidth: 0 });
        }
        else {
          this.setState({ invisibleDivWidth });
        }
      }
    }, 10);

    this.setState({ counter });
    if (onChange) {
      onChange(event);
    }
  }

  private setFocus(state: boolean) {
    if (this.input.current) {
      if (state) {
        this.input.current.focus();
      } else {
        this.input.current.blur();
      }
      return state;
    }
    return;
  }
}
