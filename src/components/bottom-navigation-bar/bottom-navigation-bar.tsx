// tslint:disable jsx-no-lambda

import * as classNames from "classnames";
import * as React from "react";

import { States } from "src/mpd-library";

import { ToolBar } from 'src/components';

import {
  HTMLDivProps,
  Popover,
  PopoverInteractionKind,
  Position,
  Text
} from "@blueprintjs/core";

import { StyledSelect } from "src/components";

import { Classes, MPDButton } from "src/mpd-library/";

import { DateInput, IDateFormatProps } from "@blueprintjs/datetime";

import './styles.css';

interface IBottomNavigationBarProps extends HTMLDivProps {
  loading: boolean;
  frontText: string;
  showTimer?: boolean;
  showBack?: boolean;
  dateActive?: boolean;
  dateFormat?: IDateFormatProps;
  timeOptions?: Array<string>;
  scheduledDate?: any;
  scheduledTime?: any;
  showExtraButton?: boolean;
  extraButtonText?: string;
  onTimeChange?(event: any): void;
  onDateChange?(selectedDate: Date, isUserChange: boolean): void;
  onTimerButtonPressed?(
    event: React.MouseEvent<HTMLElement>,
    status: boolean
  ): void;
  onSetScheduleButtonPressed?(event: React.MouseEvent<HTMLElement>): void;
  onNextButtonPressed?(event: React.MouseEvent<HTMLElement>): void;
  onExtraButtonPressed?(event: React.MouseEvent<HTMLElement>): void;
  onBackButtonPressed?(event: React.MouseEvent<HTMLElement>): void;
}

export class BottomNavigationBar extends React.Component<IBottomNavigationBarProps, {}> {
  public render() {
    const { className, loading } = this.props;
    const classes = classNames(
      'bottom-navigation-bar',
      className,
      loading && Classes.LOADING
    );

    return (
      <ToolBar
        className={classes}
        leftElement={this.renderLeftElement()}
        rightElement={this.renderRightElement()}
      />
    );
  }

  private renderLeftElement() {
    const { onBackButtonPressed, showBack } = this.props;
    return (
      <MPDButton
        text="back"
        name="login-back-dark-icon"
        onClick={onBackButtonPressed}
        className={classNames(!showBack && Classes.HIDE)}
      />
    );
  }

  private renderRightElement() {
    const {
      onTimerButtonPressed,
      dateFormat,
      dateActive,
      frontText,
      showTimer,
      scheduledDate,
      scheduledTime,
      timeOptions,
      onDateChange,
      onTimeChange,
      onSetScheduleButtonPressed,
      onNextButtonPressed,
      onExtraButtonPressed,
      showExtraButton,
      extraButtonText
    } = this.props;

    return (
      <React.Fragment>
        {showTimer && (
          <Popover
            interactionKind={PopoverInteractionKind.CLICK_TARGET_ONLY}
            isOpen={dateActive}
            onClose={(e: any) => onTimerButtonPressed && onTimerButtonPressed(e, false)}
            popoverClassName="calendar-popover"
            position={Position.TOP}
            content={
              <div className="schedule-compose-container">
                <div className="header">
                  <Text> Send this message on... </Text>
                  <MPDButton
                    name="schedule-compose-close"
                    onClick={e => onTimerButtonPressed && onTimerButtonPressed(e, false)}
                  />
                </div>
                <div className="body">
                  <DateInput
                    {...dateFormat as any}
                    minDate={new Date()}
                    value={scheduledDate ? scheduledDate : undefined}
                    onChange={onDateChange}
                    closeOnSelection={true}
                    popoverProps={{
                      position: Position.BOTTOM,
                      portalClassName: "schedule-compose-calendar"
                    }}
                  />
                  <StyledSelect
                    className="default-blue"
                    options={timeOptions}
                    value={scheduledTime ? scheduledTime : undefined}
                    onChange={onTimeChange}
                    unSelectable={true}
                  />
                </div>
                <div className="footer">
                  <MPDButton
                    onClick={onSetScheduleButtonPressed}
                    text="SET SCHEDULE"
                  />
                </div>
              </div>
            }
          >
            <MPDButton
              className={classNames("tim-clock", dateActive && Classes.ACTIVE)}
              name="tim-clock"
              selectName="tim-clock-active"
              itemState={dateActive ? States.selected : States.default}
              onClick={e => onTimerButtonPressed && onTimerButtonPressed(e, true)}
            />
          </Popover>
        )}
        {showExtraButton &&
          <MPDButton
            className="extra-button"
            text={extraButtonText}
            onClick={onExtraButtonPressed}
          />
        }
        <MPDButton
          className="actions-button"
          text={frontText}
          onClick={onNextButtonPressed}
        />
      </React.Fragment>
    );
  }
}

export default BottomNavigationBar;
