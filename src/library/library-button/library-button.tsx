import * as classNames from "classnames";
import * as React from "react";

import {
  Alignment,
  Button,
  IButtonProps,
  Text
} from "@blueprintjs/core";

import { Icon, IIconProps, TestIcon } from "..";

import "./styles.css";

export interface ILibraryButtonProps extends IButtonProps, IIconProps {
  text?: string;
  alignIcon?: Alignment;
  width?: number;
  height?: number;
  useTest?: boolean;
}

interface ILibraryButtonState {
  align: Alignment;
}

export class LibraryButton extends React.Component<
  ILibraryButtonProps,
  ILibraryButtonState
> {
  constructor(props: ILibraryButtonProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    const { alignIcon } = this.props;
    this.state = {
      align: alignIcon || Alignment.LEFT,
    };
  }

  public render() {

    const classes = 'library-button';

    const {
      className,
      name,
      text,
      alignIcon,
      width,
      height,
      useTest,
      onClick,
      ...newProps
    } = this.props;

    if(useTest){
      return (
        <Button
          style={{ height, width }}
          className={classNames(classes, className)}
          onClick={this.onClick}
          {...newProps}
        >
          <React.Fragment>
            { <TestIcon name={name} />}
          </React.Fragment>
          {text !== undefined && (
            <Text > {text} </Text>
          )}
        </Button>
      );
    }

    return (
      <Button
        className={classNames(classes, className)}
        style={{ height, width }}
        onClick={this.onClick}
        {...newProps}
      >
        {name !== undefined && (
          <Icon
            name={name}
          />
        )}
        {text !== undefined && (
          <Text> {text} </Text>
        )}
      </Button>
    );
  }

  private onClick(event: any) {
    const { onClick } = this.props;
    if(onClick) {
        onClick(event);
    }
  }
}
