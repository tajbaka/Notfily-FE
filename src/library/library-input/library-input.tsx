// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import "./styles.css";

import { HTMLInputProps, Text } from "@blueprintjs/core";

export interface ILibraryInputProps extends HTMLInputProps {
  focus?: boolean;
  maxCounter?: number;
  inputRef?: any;
  fixedPlaceholder?: string;
}

interface ILibraryInputState {
  counter?: number;
  invisibleDivWidth?: number;
}

export class LibraryInput extends React.Component<
  ILibraryInputProps,
  ILibraryInputState
> {
  public static defaultProps: HTMLInputProps = {
    placeholder: ""
  };

  private input: React.RefObject<HTMLInputElement>;

  private invisibleInput: React.RefObject<HTMLDivElement>;

  constructor(props: HTMLInputProps) {
    super(props);
    this.input = React.createRef();
    this.invisibleInput = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.state = {
      counter: undefined
    };
  }

  public componentDidMount() {
    const { focus } = this.props;
    if (focus !== undefined) {
      this.setFocus(focus);
    }
  }

  public componentWillReceiveProps({ focus, value }: ILibraryInputProps) {
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

    const classes = classNames('library-input-container', ((value && value.toString().length > 0) || (fixedPlaceholder && fixedPlaceholder.length > 0) )  && 'active', className);

    return (
      <div className={classes} tabIndex={-1}>
        <input
          className={classes + '-input'}
          required={true}
          value={value ? value : undefined}
          ref={inputRef || this.input}
          onChange={this.onChange}
          maxLength={maxCounter}
          {...newProps}
        />
        {fixedPlaceholder &&
          <React.Fragment>
            <div className={classNames('library-input-invisible', className)} ref={ this.invisibleInput }>
              { value }
            </div>
            <div className={'library-input-placeholder'} style={{ left: invisibleDivWidth ? invisibleDivWidth : 0 }}>
              { fixedPlaceholder }
            </div>
          </React.Fragment>
        }
        <span className={'library-input-label'} tabIndex={-1}>
          {placeholder}
        </span>
        {maxCounter && (
          <Text className={'library-input-counter'}>
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
