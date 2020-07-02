// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps } from "@blueprintjs/core";

import { TestIcon } from '..';

import "./styles.css";

interface ILibrarySelect {
  arrowIcon?: string;
  value?: string;
}

export interface ILibrarySelectProps extends ILibrarySelect, IProps {
  options?: Array<string>;
  onChange?:(event: any, index: number) => void;
}

interface ILibrarySelectState extends ILibrarySelect {
  mouseDown?: boolean;
  optionsOpen: boolean;
  optionsTopOffset: number;
}

export class LibrarySelect extends React.Component<
  ILibrarySelectProps,
  ILibrarySelectState
> {

  private selectRef: React.RefObject<HTMLDivElement>;

  constructor(props: ILibrarySelectProps) {
    super(props);
    this.onOptionItemClick = this.onOptionItemClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onToggleList = this.onToggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.selectRef = React.createRef();

    const { arrowIcon, options, value } = this.props;
    
    this.state = {
        arrowIcon: arrowIcon || 'select-arrow',
        value: value || options && options[0] || '',
        optionsOpen: false,
        optionsTopOffset: 0
    };
  }

  public componentWillReceiveProps(nextProps: ILibrarySelectProps) {
    if(nextProps.arrowIcon !== this.props.arrowIcon){
        this.setState({ arrowIcon: nextProps.arrowIcon });
    }
    if(nextProps.value !== this.props.value){
        this.setState({ value: nextProps.value });
    }
  }

  public componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  public componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  public render() {
    const { className, options } = this.props;
    const { arrowIcon, optionsOpen, optionsTopOffset, value } = this.state;
    const classes = 'library-select';

    return (
      <div
        className={classNames(classes, className)}
        onClick={this.onToggleList}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        ref={this.selectRef}
      >
        {value &&
          <div className={classes + '-label'} onClick={this.onToggleList}>{value}</div>
        }
        <TestIcon className={classes + '-arrow-icon'} name={arrowIcon}/>
        {optionsOpen &&
          <div className={classes + '-options'} style={{ top: optionsTopOffset }}>
            <div>
                {options && options.map((option, index) => (
                    <div className={classes + '-option'} key={index} onClick={e => this.onOptionItemClick(e, index)}> {option} </div>
                ))}
            </div>
          </div>
        }
      </div>
    );
  }

  private onMouseDown() {
    if(this.selectRef && this.selectRef.current){
      const optionsTopOffset = this.selectRef.current.offsetHeight;
      this.setState({ optionsTopOffset });
    }
    this.setState({ mouseDown: true });
  }

  private onMouseUp() {
    this.setState({ mouseDown: false });
  }

  private handleClickOutside(event: any) {
    const { mouseDown } = this.state;
    if (!mouseDown) {
      this.setState({ optionsOpen: false });
    }
  }

  private onToggleList() {
    const { optionsOpen } = this.state;
    this.setState({ optionsOpen: !optionsOpen });
  }

  private onOptionItemClick(event: any, index: number) {
    const { onChange } = this.props;
    const value = event.currentTarget.textContent;
    if (value !== this.state.value && onChange) {
      onChange(event, index);
    }
    this.setState({ value });
  }
}
