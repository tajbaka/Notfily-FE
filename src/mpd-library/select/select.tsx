// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";
import * as Classes from "../";

import { IProps } from "@blueprintjs/core";

import { MPDIcon } from '../';

import "./styles.css";

interface IMPDSelect {
  arrowIcon?: string;
  leftIcon?: string;
  value?: string;
}

export interface IMPDSelectProps extends IMPDSelect, IProps {
  options?: Array<string>;
  onChange?:(event: any) => void;
  unSelectable?: boolean;
}

interface IMPDSelectState extends IMPDSelect {
  mouseDown?: boolean;
  optionsOpen: boolean;
  optionsTopOffset: number;
}

export class MPDSelect extends React.Component<
  IMPDSelectProps,
  IMPDSelectState
> {

  private selectRef: React.RefObject<HTMLDivElement>;

  constructor(props: IMPDSelectProps) {
    super(props);
    this.onOptionItemClick = this.onOptionItemClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onToggleList = this.onToggleList.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.selectRef = React.createRef();

    const { arrowIcon, options, value, leftIcon } = this.props;
    
    this.state = {
        arrowIcon: arrowIcon || 'select-arrow',
        leftIcon,
        value: value || options && options[0] || '',
        optionsOpen: false,
        optionsTopOffset: 0
    };
  }

  public componentWillReceiveProps(nextProps: IMPDSelectProps) {
    if(nextProps.arrowIcon !== this.props.arrowIcon){
        this.setState({ arrowIcon: nextProps.arrowIcon });
    }
    if(nextProps.value !== this.props.value){
        this.setState({ value: nextProps.value });
    }
    if(nextProps.leftIcon !== this.props.leftIcon){
        this.setState({ leftIcon: nextProps.leftIcon })
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
    const { arrowIcon, leftIcon, optionsOpen, optionsTopOffset, value } = this.state;
    const classes = Classes.SELECT;

    return (
      <div
        className={classNames(classes, className)}
        onClick={this.onToggleList}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        ref={this.selectRef}
      >
        {leftIcon &&
          <MPDIcon className={classes + '-left-icon'} name={leftIcon}/>
        }
        {value &&
          <div className={classes + '-label'} onClick={this.onToggleList}>{value}</div>
        }
        <MPDIcon className={classes + '-arrow-icon'} name={arrowIcon}/>
        {optionsOpen &&
          <div className={Classes.SELECT_OPTIONS} style={{ top: optionsTopOffset }}>
            <div>
                {options && options.map((option, index) => (
                    <div className={Classes.SELECT_OPTION} key={index} onClick={this.onOptionItemClick}> {option} </div>
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

  private onOptionItemClick(event: any) {
    const { onChange, unSelectable } = this.props;
    const value = event.currentTarget.textContent;
    if (value !== this.state.value && onChange) {
      onChange(event);
    }
    if(!unSelectable){
      this.setState({ value });
    }
  }
}
