// tslint:disable
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { createTimeIntervals, duplicateIndex, scheduleActions } from 'src/actions';

import { Redirect, Route, Switch } from "react-router-dom";

import { language } from '../';

import { StyledButton, StyledSelect, StyledTabs, ToolBar } from 'src/components';

import { LibraryFloatingInput } from 'src/library';

import { TabId, Text, Spinner } from "@blueprintjs/core";

import "./styles.css";

export interface ISettingsProps {
  auth: any;
  schedules: any;
  loading?: boolean;
  error: string;
  settings: any;
  routeProps?: any;
  onGetAdminData: (adminUid: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onUpdateSchedule: (schedule: any, adminUid: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onUpdateSettings: (settings: any, adminUid: string) => (dispatch: Dispatch<any>) => Promise<void>;
}

interface ISettingsState {
  adminUid: string;
  scheduleError?: any;
  schedules: any;
  settings: any;
  timeSplit: Array<string>;
  timeOptions: Array<string>;
  tabs: Array<string>;
  selectedTabNum: TabId;
}

export class Settings extends React.Component<ISettingsProps, ISettingsState> {

  private copyRef: React.RefObject<HTMLInputElement>;

  constructor(props: ISettingsProps) {
    super(props);
    this.copyRef = React.createRef();
    this.renderTopBar = this.renderTopBar.bind(this);
    this.onLogoClicked = this.onLogoClicked.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onAddSchedule = this.onAddSchedule.bind(this);
    this.onChangeScheduleInput = this.onChangeScheduleInput.bind(this);
    this.onRemoveSchedule = this.onRemoveSchedule.bind(this);
    this.copyText = this.copyText.bind(this);
    this.onUpdateLanguage = this.onUpdateLanguage.bind(this);
    this.renderMain = this.renderMain.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.onUserItemChanged = this.onUserItemChanged.bind(this);
    this.updatedSelectedTabNum = this.updatedSelectedTabNum.bind(this);

    let auth = localStorage.getItem('adminAuth');
    auth = auth && JSON.parse(auth);
    const adminUid = auth && (auth as any).user.uid;

    this.props.onGetAdminData(adminUid);

    const { settings, schedules } = this.props;
    const timeSplit = ['5', '10', '15', '20', '30', '60'];
    const timeOptions = createTimeIntervals("h:mm a", (60/settings.timeSplit));


    this.state = {
        adminUid: auth && (auth as any).user.uid,
        schedules: JSON.parse(JSON.stringify(schedules)),
        settings: JSON.parse(JSON.stringify(settings)),
        timeSplit,
        timeOptions,
        tabs: ['config', 'users'],
        selectedTabNum: 0
    }
  }

  public componentWillReceiveProps(nextProps: any) {
    if(this.props.schedules !== nextProps.schedules) {
      this.setState({ schedules: JSON.parse(JSON.stringify(nextProps.schedules)) });
    }
    if(this.props.settings !== nextProps.settings){
      this.setState({ settings: JSON.parse(JSON.stringify(nextProps.settings)) });
    }
    if(this.props.routeProps !== nextProps.routeProps){
      this.updatedSelectedTabNum();
    }
  }

  public componentDidMount() {
    this.updatedSelectedTabNum();
  }

  public render() {
    const classes = 'notifly-settings';
    const { loading, error, routeProps, settings } = this.props;
    const { selectedTabNum, tabs } = this.state;

    if(error){
      return(
          <Redirect to="/error" />
      );
    }

    return (
        <div className={classes}>
            {this.renderTopBar(classes)}
            {loading && <Spinner className={classes + '-spinner'} size={30} />}
            <StyledTabs
              tabs={tabs}
              type='primary'
              tabsProps={{
                  id: classes + '-styled-tabs',
                  onChange: this.onChangeTab,
                  selectedTabId: selectedTabNum,
              }}
            />
            <div className={classes + '-scroll-container'}>
              <Switch location={routeProps.history.location}>
                <Redirect exact={true} from="/settings" to="/settings/config" />
                <Route
                  path={"/settings/config"}
                  exact={true}
                  render={() => (
                    this.renderMain(classes)
                  )}
                />
                <Route
                  path={"/settings/users"}
                  exact={true}
                  render={() => (
                    settings.users !== undefined ? 
                      this.renderUsers(classes)
                      :
                      null
                  )}
                />
              </Switch>
            </div>
        </div>
    );
  }

  private renderUsers(classes: string) {
    const { settings } = this.state;
    return (
        <React.Fragment>
          {Object["values"](settings.users).map((user: any, index: number) => (
            <div className={classes + '-users-item'}>
              <div className={classes + '-users-item-basic'}> 
                <Text className={classes + '-user-item-user-name'}> { user.userName } </Text>
                <Text className={classes + '-user-item-user-email'}> { user.userEmail } </Text>
                <Text className={classes + '-user-item-user-phone'}> { user.userPhoneNumber } </Text>
              </div>
              <LibraryFloatingInput className={classes + '-user-item-user-comments'} placeholder='Comments' onChange={e => this.onUserItemChanged(e, index)} value={user.comments} />
            </div>
          ))}
        </React.Fragment>
    );
  }

  private onUserItemChanged(event: any, index: number) {
    const { settings } = this.state;
    const value = event.currentTarget.value;
    Object["values"](settings.users)[index].comments = value;
    this.setState({ settings });
  }

  private renderMain(classes: string) {
    const { adminUid, settings, timeOptions } = this.state;
    return (
      <div className={classes + '-inner-container'}>
        <div className={classes + '-row'}>
          <Text className={classes + '-label'}> {language[settings.language].linkToShare}: </Text>
          <input className={classes + '-hidden-link'} value={'https://notiflyapp.co/user/' + adminUid} ref={this.copyRef} onClick={this.copyText} />
          <input className={classes + '-shown-link'} value={language[settings.language].clickToCopy}/>
        </div>
        <div className={classes + '-row'}>
          <Text className={classes + '-label'}> {language[settings.language].selectLanguage}: </Text>
          <StyledSelect
            type='primary-color'
            className={classes + '-update-language'}
            options={['english', 'spanish']}
            value={settings.language}
            onChange={this.onUpdateLanguage}
          />
        </div>
        <div className={classes + '-row'}>
          <Text className={classes + '-label'}> {language[settings.language].dailyStartTime} </Text>
          <StyledSelect
              className={classes + '-time-restriction'}
              type='primary-color'
              onChange={e => this.onSelectChanged(e, 'startTime')}
              value={settings.startTime}
              options={timeOptions}
          />
          <Text className={classes + '-label'}> {language[settings.language].dailyEndTime} </Text>
          <StyledSelect
              className={classes + '-time-restriction'}
              type='primary-color'
              onChange={e => this.onSelectChanged(e, 'endTime')}
              value={settings.endTime}
              options={timeOptions}
          />
        </div>
        <div className={classes + '-row'}>
            <Text className={classes + '-label'}> {language[settings.language].eventsCannotChange} </Text>
            <StyledSelect
                className={classes + '-actions-select'}
                type='primary-color'
                onChange={e => this.onSelectChanged(e, 'maxChangeTime')}
                value={settings.maxChangeTime}
                options={['3', '6', '12', '24', '48']}
            />
            <Text className={classes + '-label'}> {language[settings.language].hoursBeforeTimeSlot}  </Text>
        </div>
        {/* <div className={classes + '-row'}>
            <Text className={classes + '-label'}> {language[settings.language].splitCalendarBy} </Text>
            <StyledSelect
                className={classes + '-actions-select'}
                type='primary-color'
                onChange={e => this.onSelectChanged(e, 'timeSplit')}
                value={settings.timeSplit}
                options={timeSplit}
            />
            <Text className={classes + '-label'}> {language[settings.language].minutes} </Text>
        </div> */}
        <div className={classes + '-row'}>
            <Text className={classes + '-label'}> {language[settings.language].scheduleCanBeBooked} </Text>
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
            <Text className={classes + '-label'}> {language[settings.language].weeksInAdvance} </Text>
        </div>
        {/* <div className={classNames(classes + '-row', 'schedule')}>
          <Text className={classes + '-label'}> {language[settings.language].currentSchedules} </Text>
          <StyledButton
              className={classes + '-add-calendars'}
              name='plus'
              useTest={true}
              onClick={this.onAddSchedule}
          />
          <Text className={classNames(classes + '-schedule-error', scheduleError !== undefined && 'active')}> { scheduleError && scheduleError.title } </Text>
        </div> */}
        {/* <div className={classes + '-schedule'}>
          {schedules.map((element: any, index: any) => (
              <div className={classes + '-schedule-item'}>
                <input className={classNames(classes + '-schedule-item-title', scheduleError && scheduleError.index === index && 'error')} onChange={e => this.onChangeScheduleInput(e, index)} value={ element.title } />
                <StyledButton className={classes + '-schedule-item-remove'} name='close' useTest={true} onClick={e => this.onRemoveSchedule(index)}/>
              </div>
          ))}
        </div> */}
      </div>
    );
  }

  private updatedSelectedTabNum() {
    const { routeProps } = this.props;
    const { tabs } = this.state;
    const pathname = routeProps.history.location.pathname;
    const pathArr = pathname.split('/');
    const selectedTabNum = tabs.findIndex((tab:any) => tab === pathArr[pathArr.length - 1]);
    this.setState({ selectedTabNum });
  }

  private onChangeTab(newTabNum: TabId, prevTabNum: TabId, event: any) {
    const { routeProps } = this.props;
    const { tabs } = this.state;
    const tabId = tabs[newTabNum].toLowerCase();
    this.setState({ selectedTabNum: newTabNum })
    routeProps.history.push(`/settings/${tabId}`);
  }

  private copyText() {
    if(this.copyRef.current){
      this.copyRef.current.select();
      document.execCommand("copy");
      alert("Copied the text!");
    }
  }

  private onRemoveSchedule(index: number){
    const { schedules } = this.state;
    if(schedules.length > 1){
      schedules.splice(index, 1);
      this.setState({ schedules });
    }
  }

  private onChangeScheduleInput(event: any, index: number){
    const value = event.currentTarget.value;
    const { schedules } = this.state;
    schedules[index].title = value;
    this.setState({ schedules });
  }

  private onAddSchedule(event: any) {
    const { schedules } = this.state;
    const id = Math.floor(Math.random()*(999-100+1)+100).toString();
    const obj = {
      id,
      title: 'default value',
      events: [],
    }
    schedules.push(obj);
    this.setState({ schedules });
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

  private onUpdateLanguage(event: any) {
    const { settings } = this.state;
    const value = event.currentTarget.textContent;
    let lang = 'english';
    if(value.includes('spanish')){
        lang = 'spanish';
    }
    settings.language = lang;
    this.setState({ settings });
  }

  private renderTopBar (classes: string) {
    const { settings } = this.props;
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
          {language[settings.language].adminSettings}
        </Text>
      ),
      rightElement: (
        <React.Fragment>
          <StyledButton
              className={classNames(classes + '-save', (JSON.stringify(this.props.settings) === JSON.stringify(this.state.settings) && JSON.stringify(this.props.schedules) === JSON.stringify(this.state.schedules)) && 'disabled')}
              text='Save'
              type='white-color'
              onClick={this.onSaveClick}
          />
        </React.Fragment>
      )
  }
    return (
      <ToolBar {...topBarProps as any} />
    );
  }

  private onSaveClick() {
    const { adminUid, settings, schedules } = this.state;
    this.props.onUpdateSettings(settings, adminUid);
    const index = duplicateIndex(schedules, 'title');
    if(index === -1){
      this.setState({ scheduleError: undefined }, () => {
        this.props.onUpdateSchedule(schedules, adminUid);
      });
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
  const { adminSchedule, settings, auth, global } = state;
  const { loading } = global;
  const { schedules } = adminSchedule;
  const { error } = settings;
  return { schedules, settings, error, loading, auth };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onGetAdminData: bindActionCreators(
      scheduleActions.onGetAdminData,
      dispatch
    ),
    onUpdateSchedule: bindActionCreators(
      scheduleActions.onUpdateSchedule,
      dispatch
    ),
    onUpdateSettings: bindActionCreators(
        scheduleActions.onUpdateSettings,
        dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
