// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { createTimeIntervals, duplicateIndex, scheduleActions, settingsActions } from 'src/actions';

import { MPDHiddenScrollContainer } from 'src/mpd-library';

import { StyledButton, StyledSelect, ToolBar } from 'src/components';

import { Text } from "@blueprintjs/core";

import "./styles.css";

export interface ISettingsProps {
  schedule: any;
  settings: any;
  routeProps?: any;
  onUpdateSchedule: (schedule: any) => (dispatch: Dispatch<any>) => Promise<void>;
  onSaveChanges: (settings: any) => (dispatch: Dispatch<any>) => Promise<void>;
}

interface ISettingsState {
  scheduleError?: any;
  schedule: any;
  settings: any;
  timeSplit: Array<string>;
  timeOptions: Array<string>;
}

export class Settings extends React.Component<ISettingsProps, ISettingsState> {

  constructor(props: ISettingsProps) {
    super(props);
    this.renderTopBar = this.renderTopBar.bind(this);
    this.onLogoClicked = this.onLogoClicked.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onAddSchedule = this.onAddSchedule.bind(this);
    this.onChangeScheduleInput = this.onChangeScheduleInput.bind(this);
    this.onRemoveSchedule = this.onRemoveSchedule.bind(this);

    const { settings, schedule } = this.props;
    const timeSplit = [];
    const timeOptions = createTimeIntervals("h:mm a", (60/settings.timeSplit));

    for(let i = 1; i <= 60; i++){
        if(i % 5 === 0){
            timeSplit.push(i.toString());
        }
    }

    

    this.state = {
        schedule: JSON.parse(JSON.stringify(schedule)),
        settings: JSON.parse(JSON.stringify(settings)),
        timeSplit,
        timeOptions
    }
  }

  public render() {
    const classes = 'notifly-settings';
    const { timeSplit } = this.state;
    const { settings, schedule, scheduleError, timeOptions } = this.state;
    return (
        <div className={classes}>
            {this.renderTopBar(classes)}
            <MPDHiddenScrollContainer yDirection={true} className={classes + '-scroll-container'}>
              <div className={classes + '-inner-container'}>
                <div className={classes + '-row'}>
                  <Text className={classes + '-label'}> Daily Start Time </Text>
                  <StyledSelect
                      className={classes + '-time-restriction'}
                      type='primary-color'
                      onChange={e => this.onSelectChanged(e, 'startTime')}
                      value={settings.startTime}
                      options={timeOptions}
                  />
                  <Text className={classes + '-label'}> Daily End Time </Text>
                  <StyledSelect
                      className={classes + '-time-restriction'}
                      type='primary-color'
                      onChange={e => this.onSelectChanged(e, 'endTime')}
                      value={settings.endTime}
                      options={timeOptions}
                  />
                </div>
                <div className={classes + '-row'}>
                    <Text className={classes + '-label'}> Events cannot be changed </Text>
                    <StyledSelect
                        className={classes + '-actions-select'}
                        type='primary-color'
                        onChange={e => this.onSelectChanged(e, 'maxChangeTime')}
                        value={settings.maxChangeTime}
                        options={['3', '6', '12', '24', '48']}
                    />
                    <Text className={classes + '-label'}> hours before scheduled time slot  </Text>
                </div>
                <div className={classes + '-row'}>
                    <Text className={classes + '-label'}> Split calendar by </Text>
                    <StyledSelect
                        className={classes + '-actions-select'}
                        type='primary-color'
                        onChange={e => this.onSelectChanged(e, 'timeSplit')}
                        value={settings.timeSplit}
                        options={timeSplit}
                    />
                    <Text className={classes + '-label'}> minutes </Text>
                </div>
                <div className={classes + '-row'}>
                    <Text className={classes + '-label'}> Schedule can be booked </Text>
                    <input
                        className={classes + '-input'}
                        autoCapitalize="none"
                        autoCorrect="none"
                        maxLength={3}
                        value={settings.maxScheduledTime}
                        onChange={e => this.onInputChanged(e, 'maxScheduledTime')}
                        placeholder=""
                        tabIndex={1}
                    />
                    <Text className={classes + '-label'}> weeks in advance </Text>
                </div>
                {/* <div className={classes + '-row'}>
                    <Text className={classes + '-label'}> Max Amount of People Per Event: </Text>
                    <input
                        className={classes + '-input'}
                        autoCapitalize="none"
                        autoCorrect="none"
                        maxLength={3}
                        value={settings.maxEvents}
                        onChange={e => this.onInputChanged(e, 'maxEvents')}
                        placeholder=""
                        tabIndex={1}
                    />
                </div> */}
                <div className={classNames(classes + '-row', 'schedule')}>
                  <Text className={classes + '-label'}> Current schedules </Text>
                  <StyledButton
                      className={classes + '-add-calendars'}
                      name='plus-button'
                      useTest={true}
                      onClick={this.onAddSchedule}
                  />
                  <Text className={classNames(classes + '-schedule-error', scheduleError !== undefined && 'active')}> { scheduleError && scheduleError.title } </Text>
                </div>
                  <div className={classes + '-schedule'}>
                  {
                    schedule.schedules.map((element: any, index: any) => (
                      <div className={classes + '-schedule-item'}>
                        <input className={classNames(classes + '-schedule-item-title', scheduleError && scheduleError.index === index && 'error')} onChange={e => this.onChangeScheduleInput(e, index)} value={ element.title } />
                        <StyledButton className={classes + '-schedule-item-remove'} name='close-black-small' useTest={true} onClick={e => this.onRemoveSchedule(index)}/>
                      </div>
                    ))
                  }
                  </div>
              </div>
            </MPDHiddenScrollContainer>
            
        </div>
    );
  }

  private onRemoveSchedule(index: number){
    const { schedule } = this.state;
    if(schedule.schedules.length > 1){
      schedule.schedules.splice(index, 1);
      this.setState({ schedule });
    }
  }

  private onChangeScheduleInput(event: any, index: number){
    const value = event.currentTarget.value;
    const { schedule } = this.state;
    schedule.schedules[index].title = value;
    this.setState({ schedule });
  }

  private onAddSchedule(event: any) {
    const { schedule } = this.state;
    const id = Math.floor(Math.random()*(999-100+1)+100).toString();
    const obj = {
      id,
      title: 'default value',
      events: [],
    }
    schedule.schedules.push(obj);
    this.setState({ schedule });
  }

  private onInputChanged(event: any, type: string){
    const { settings } = this.state;
    const value = event.currentTarget.value;
    settings[type] = value;
    this.setState({ settings });
  }

  private onSelectChanged(event: any, type: string){
    const { settings } = this.state;
    const value = event.currentTarget.textContent.substring(1, event.currentTarget.textContent.length-1);
    settings[type] = value;
    this.setState({ settings });
  }

  private renderTopBar (classes: string) {
    const topBarProps = {
      leftElement: (
        <StyledButton
            className={classes + '-settings'}
            name='notifly-logo-2-white'
            onClick={this.onLogoClicked}
        />
      ),
      centerElement: (
        <Text className={classes + '-title'}>
          Admin Settings
        </Text>
      ),
      rightElement: (
        <StyledButton
            className={classNames(classes + '-save', (JSON.stringify(this.props.settings) === JSON.stringify(this.state.settings) && JSON.stringify(this.props.schedule) === JSON.stringify(this.state.schedule)) && 'disabled')}
            text='Save'
            type='white-color'
            onClick={this.onSaveClick}
        />
      )
  }
    return (
      <ToolBar {...topBarProps as any} />
    );
  }

  private onSaveClick() {
    const { settings, schedule } = this.state;
    this.props.onSaveChanges(settings);
    const index = duplicateIndex(schedule.schedules, 'title');
    if(index === -1){
      this.props.onUpdateSchedule(schedule);
      this.setState({ scheduleError: undefined });
    }
    else {
      const scheduleError = {
        title: 'Schedule names cannot have duplicate names',
        index
      }
      this.setState({ scheduleError });
    }
  }

  private onLogoClicked() {
    const { routeProps } = this.props;
    routeProps.history.push('/schedule');
  }
}

const mapStateToProps = (state: any) => {
  const { schedule, settings } = state;
  return { schedule, settings };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onSaveChanges: bindActionCreators(
        settingsActions.onUpdateSettings,
        dispatch
    ),
    onUpdateSchedule: bindActionCreators(
      scheduleActions.onUpdateSchedule,
      dispatch
  )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
