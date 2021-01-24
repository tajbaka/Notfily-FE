// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { authActions, scheduleActions } from 'src/actions';

import { Redirect } from "react-router-dom";

import { StyledAlert, StyledButton, StyledInput, StyledSelect, ToolBar } from 'src/components';

import { language } from '../';

import BigCalendar from 'react-big-calendar';

import { Spinner, Text } from "@blueprintjs/core";

import * as moment from 'moment';

import "./styles.css";

export interface IUserScheduleProps {
  authenticated: boolean;
  settings: any;
  error?: string;
  userSchedule: any;
  loading?: boolean;
  schedules: any;
  signinError: string;
  routeProps?: any;
  onGetAdminData: (adminUid:string) => (dispatch: Dispatch<any>) => Promise<void>;
  onGetUserData: (userUid:string, adminUid: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onSaveChanges: (schedules: any, adminUid: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onUpdateUser: (user: any, adminUid: string, userUid: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onCreateUser: (schedules: any, adminUid: string, email: string, password: string, authString: string, name: string, phoneNumber:string, language: string) => (dispatch: Dispatch<any>) => Promise<void>;
  logoutAction: (authString?: string) => (dispatch: Dispatch<any>) => Promise<void>;
}

interface IUserScheduleState {
  adminUid: string;
  userUid: string;
  authenticated: boolean;
  actionPressed?: string;
  localizer: any;
  timeSlots: number;
  selectedEvent?: any;
  showAlert: boolean;
  tempStart?: Date;
  tempEnd?: Date;
  scheduleIndex: number;
  userSchedule: any;
  view: any;
}

export class UserSchedule extends React.Component<IUserScheduleProps, IUserScheduleState> {

  constructor(props: IUserScheduleProps) {
    super(props);
    const localizer = BigCalendar.momentLocalizer(moment);
    this.onSelecting = this.onSelecting.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.onEventGetter = this.onEventGetter.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onAlertConfirm = this.onAlertConfirm.bind(this);
    this.onAlertCancel = this.onAlertCancel.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onAlertSignInputChanged = this.onAlertSignInputChanged.bind(this);
    this.onChangeSchedule = this.onChangeSchedule.bind(this);
    this.onSlotGetter = this.onSlotGetter.bind(this);
    this.onUpdateLanguage = this.onUpdateLanguage.bind(this);

    const { settings, routeProps, userSchedule } = this.props;

    const pathArr = routeProps.history.location.pathname.split('/');
    const adminUid = pathArr[pathArr.length - 1];
    this.props.onGetAdminData(adminUid);

    let { authenticated } = this.props;
    const timeSlots = 60/settings.timeSplit;

    let auth = localStorage.getItem('userAuth');
    auth = auth && JSON.parse(auth);

    if(auth !== null) {
      authenticated = true;
    }

    const isMobile = window.innerWidth <= 480;

    this.state = {
      adminUid,
      scheduleIndex: 0,
      userUid: auth && (auth as any).user.uid,
      authenticated,
      localizer,
      showAlert: false,
      timeSlots,
      userSchedule: JSON.parse(JSON.stringify(userSchedule)),
      view: isMobile ? 'day' : 'week'
    }
    this.props.onGetUserData(this.state.userUid, adminUid);
  }

  public componentWillReceiveProps(nextProps: IUserScheduleProps){
    if(nextProps.authenticated !== this.props.authenticated){
      if(nextProps.authenticated){
        this.setState({ selectedEvent: undefined, tempStart: undefined, tempEnd: undefined, showAlert: false }, () => {
          this.addExitButtons();
        });
      }
      this.setState({ authenticated: nextProps.authenticated })
    }
    if(this.props.schedules !== nextProps.schedules) {
      setTimeout(() => {
          const toolBarGroups = document.getElementsByClassName("rbc-btn-group");
          const navBar = toolBarGroups[0];
          if(navBar){
            const navButtons = navBar.childNodes;
            navButtons[1].textContent = '<';
            navButtons[2].textContent = '>';
            this.addExitButtons();
          }
      }, 100);
    }
    if(this.props.userSchedule !== nextProps.userSchedule){
      this.setState({ userSchedule: nextProps.userSchedule });
    }
    if(this.props.settings !== nextProps.settings){
      const timeSlots = 60/nextProps.settings.timeSplit;
      this.setState({ timeSlots });
    }
  }

  public componentDidMount(){
    const toolBarGroups = document.getElementsByClassName("rbc-btn-group");
    const navBar = toolBarGroups[0];
    const navButtons = navBar.childNodes;
    navButtons[1].textContent = '<';
    navButtons[2].textContent = '>';
    this.addExitButtons();
  }

  public render() {
    const classes = 'user-schedule';
    const { settings, error, loading, signinError } = this.props;
    const { authenticated, actionPressed, userSchedule, scheduleIndex, localizer, selectedEvent, showAlert, tempStart, tempEnd, view } = this.state;
    const startTime = moment(settings.startTime, 'h: mm a').toDate();
    const endTime = moment(settings.endTime, 'h: mm a').toDate();
    const schedules = JSON.parse(JSON.stringify(this.props.schedules[scheduleIndex]))
    const events = schedules.events;
    if(error){
      return(
          <Redirect to="/error" />
      );
    }

    if(events && events.length > 0){
      for(let i = 0; i < events.length; i++){
          events[i].start = new Date(events[i].start);
          events[i].end = new Date(events[i].end);
          if(userSchedule.userName === undefined || events[i].createdBy !== userSchedule.userName){
            events[i].title = language[userSchedule.language].cannotBookHere;
          }
      }
    }

    return (
      <div className={classNames(classes)}>
          {loading && <Spinner className={classes + '-spinner'} size={30} />}
          {this.renderTopBar()}
          <div className={classes + '-inner-container'}>
            <BigCalendar
              className={classNames(classes + '-rbc-calendar', userSchedule.language, view)}
              localizer={localizer}
              longPressThreshold={0}
              events={events || []}
              min={startTime}
              max={endTime}
              slotPropGetter={this.onSlotGetter}
              onView={newView => setTimeout(() => {
                this.setState({ view: newView })
                this.addExitButtons()
            }, 100)}
              onNavigate={e => setTimeout(() => {
                  this.addExitButtons()
              }, 100)}
              timeslots={1}
              eventPropGetter={this.onEventGetter}
              onSelectEvent={this.onSelectEvent}
              selectable={true}
              defaultView={view}
              views={['week', 'day']}
              onSelecting={this.onSelecting}
              onSelectSlot={this.onSelectSlot}
            />
            {actionPressed === 'exit' &&
              <StyledAlert
                className={classNames(classes + '-alert')}
                cancelButtonText={language[userSchedule.language].no}
                confirmButtonText={language[userSchedule.language].yes}
                isOpen={showAlert}
                canEscapeKeyCancel={true}
                canOutsideClickCancel={true}
                onCancel={this.onAlertCancel}
                onConfirm={this.onAlertConfirm}
              >   
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> {language[userSchedule.language].sureDelete} </Text>
                </div>
              </StyledAlert>
            }
            {actionPressed === 'changeError' &&
              <StyledAlert
                className={classNames(classes + '-alert-change-error')}
                confirmButtonText={language[userSchedule.language].ok}
                isOpen={showAlert}
                canEscapeKeyCancel={true}
                canOutsideClickCancel={true}
                onConfirm={this.onAlertCancel}
              >   
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> {language[userSchedule.language].appointmentChanged + ' ' + settings.maxChangeTime + ' ' + language[userSchedule.language].hoursBefore}  </Text>
                </div>
              </StyledAlert>
            }
            {(!authenticated && tempStart && tempEnd) &&  actionPressed !== 'changeError' &&
              <StyledAlert
                className={classNames(classes + '-alert')}
                cancelButtonText={language[userSchedule.language].cancel}
                confirmButtonText={language[userSchedule.language].confirm}
                isOpen={showAlert}
                canEscapeKeyCancel={true}
                canOutsideClickCancel={true}
                onCancel={this.onAlertCancel}
                onConfirm={this.onAlertConfirm}
              >   
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> {language[userSchedule.language].event} </Text>
                  <div className={classes + '-alert-details-new-container'}>
                    <StyledInput
                      className={classes + '-alert-input'}
                      inputType='floating'
                      autoCapitalize="none"
                      autoCorrect="none"
                      required={true}
                      maxCounter={50}
                      floatingType="settings"
                      value={selectedEvent.title.replace(userSchedule.userName + ` ${language[userSchedule.language].event} `, '')}
                      onChange={(e: any) => this.onAlertInputChanged(e)}
                      placeholder={language[userSchedule.language].eventTitle}
                      tabIndex={1}
                    />
                    <StyledInput
                      className={classes + '-alert-input'}
                      inputType='floating'
                      autoCapitalize="none"
                      autoCorrect="none"
                      required={true}
                      floatingType="settings"
                      value={userSchedule.userName}
                      onChange={(e: any) => this.onAlertSignInputChanged(e, 'userName')}
                      placeholder={language[userSchedule.language].name}
                      tabIndex={1}
                    />
                    <StyledInput
                      className={classes + '-alert-input'}
                      inputType='floating'
                      autoCapitalize="none"
                      autoCorrect="none"
                      required={true}
                      floatingType="settings"
                      value={userSchedule.userEmail}
                      onChange={(e: any) => this.onAlertSignInputChanged(e, 'userEmail')}
                      placeholder={language[userSchedule.language].email}
                      tabIndex={1}
                    />
                    <StyledInput
                      className={classes + '-alert-input'}
                      inputType='floating'
                      autoCapitalize="none"
                      autoCorrect="none"
                      required={true}
                      floatingType="settings"
                      value={userSchedule.userPhoneNumber}
                      onChange={(e: any) => this.onAlertSignInputChanged(e, 'userPhoneNumber')}
                      placeholder={language[userSchedule.language].phoneNumber}
                      tabIndex={1}
                    />
                    <Text className={classNames(classes + '-sign-in-error', signinError && signinError.length > 0 && 'active')}> { signinError } </Text>
                  </div>
                </div>
              </StyledAlert>
            }
            {actionPressed === 'clicked' && selectedEvent &&
              <StyledAlert
                  className={classNames(classes + '-alert')}
                  cancelButtonText={language[userSchedule.language].cancel}
                  confirmButtonText={language[userSchedule.language].ok}
                  canEscapeKeyCancel={true}
                  canOutsideClickCancel={true}
                  isOpen={showAlert}
                  onCancel={this.onAlertCancel}
                  onConfirm={this.onAlertConfirm}
              >
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> {language[userSchedule.language].alertDetails} </Text>
                  <div className={classes + '-alert-details-container'}>
                      <div className={classes + '-alert-details-labels'}>
                          <Text className={classes + '-alert-label'}> {language[userSchedule.language].time} </Text>
                          <Text className={classes + '-alert-label'}> {language[userSchedule.language].title} </Text>
                      </div>
                      <div className={classes + '-alert-details'}>
                          <Text className={classes + '-alert-detail'}> { selectedEvent.time } </Text>
                          <StyledInput
                            className={classes + '-alert-input'}
                            inputType='floating'
                            autoCapitalize="none"
                            autoCorrect="none"
                            maxCounter={50}
                            floatingType="settings"
                            value={selectedEvent.title.replace(userSchedule.userName + ` ${language[userSchedule.language].event} `, '')}
                            onChange={(e: any) => this.onAlertInputChanged(e)}
                            placeholder=""
                            tabIndex={1}
                        />
                          {/* <Text className={classes + '-alert-detail'}> { selectedEvent.title } </Text> */}
                      </div>
                  </div>
                </div>
              </StyledAlert>
            }
            {(actionPressed === 'new' && (tempStart && tempEnd && authenticated)) && selectedEvent &&
              <StyledAlert
                className={classNames(classes + '-alert')}
                confirmButtonText={language[userSchedule.language].confirm}
                isOpen={showAlert}
                cancelButtonText={language[userSchedule.language].cancel}
                canEscapeKeyCancel={true}
                canOutsideClickCancel={true}
                onCancel={this.onAlertCancel}
                onConfirm={this.onAlertConfirm}
              >   
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> {language[userSchedule.language].event} </Text>
                  <div className={classes + '-alert-details-new-container'}>
                    <Text className={classes + '-alert-input-label'}> {language[userSchedule.language].eventTitle} </Text>
                    <div className={classes + '-alert-input-container'}>
                      <StyledInput
                          className={classes + '-alert-input'}
                          inputType='floating'
                          autoCapitalize="none"
                          autoCorrect="none"
                          maxCounter={50}
                          floatingType="settings"
                          value={selectedEvent.title.replace(userSchedule.userName + ` ${language[userSchedule.language].event} `, '')}
                          onChange={(e: any) => this.onAlertInputChanged(e)}
                          placeholder=""
                          tabIndex={1}
                      />
                    </div>
                  </div>
                </div>
              </StyledAlert>
            }
          </div>
      </div>
    );
  }

  private onAlertSignInputChanged(event: any, type: string){
    const { userSchedule } = this.state;
    const value = event.currentTarget.value;
    userSchedule[type] = value;
    this.setState({ userSchedule });
  }

  private onAlertInputChanged(event: any) {
    const { selectedEvent } = this.state;
    const value = event.currentTarget.value;
    selectedEvent.title = value;
    this.setState({ selectedEvent });
  }
  
  private onAlertCancel() {
    this.setState({ showAlert: false, actionPressed: undefined });
  }

  private onAlertConfirm(){
    let { schedules } = this.props;
    schedules = JSON.parse(JSON.stringify(schedules));
    const { authenticated, adminUid, actionPressed, scheduleIndex, userSchedule, selectedEvent, tempEnd, tempStart } = this.state;

    if(actionPressed === 'exit'){
      const index = schedules[scheduleIndex].events.findIndex((ele: any) => ele.id === selectedEvent.id);
      if(index !== undefined){
        schedules[scheduleIndex].events.splice(index, 1);
      }
      this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false }, () => {
        this.props.onSaveChanges(schedules, adminUid);
      })
    }
    else if(actionPressed === 'clicked'){
      const index = schedules[scheduleIndex].events.findIndex((ele: any) => ele.id === selectedEvent.id);
      if(index !== undefined){
        let title = selectedEvent.title;
        let changesMade = false;
        if(title !== schedules[scheduleIndex].events[index].title){
            changesMade = true;
        }
        if(!title.includes(userSchedule.userName)){
          title = `${userSchedule.userName + ' ' + language[userSchedule.language].event} \n` + title;
        }
        schedules[scheduleIndex].events[index].title = title;
        if(changesMade){
          this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false }, () => {
            this.props.onSaveChanges(schedules, adminUid);
          })
        }
        else {
          this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false });
        }
      }
    }
    else if(actionPressed === 'new' && tempStart && tempEnd){
      let title = selectedEvent.title;
      if(!title.includes(userSchedule.name)){
        title = `${userSchedule.userName + ' ' + language[userSchedule.language].event} \n` + title;
      }
      const event = { id: selectedEvent.id, createdBy: userSchedule.userName, start: selectedEvent.start, end: selectedEvent.end, title, phoneNumber: userSchedule.userPhoneNumber, email: userSchedule.userEmail, type: selectedEvent.type, timeStamp: new Date() };

      if(schedules[scheduleIndex].events){
        schedules[scheduleIndex].events.push(event);
      }
      else {
        schedules[scheduleIndex].events = [event];
      }

      if(authenticated) {
        this.setState({ actionPressed: undefined, selectedEvent: undefined, tempStart: undefined, tempEnd: undefined, showAlert: false }, () => {
          this.props.onSaveChanges(schedules, adminUid);
        });
      }
      else {
        console.log(userSchedule)
        this.props.onCreateUser(schedules, adminUid, userSchedule.userEmail, 'testing', 'userAuth', userSchedule.userName, userSchedule.userPhoneNumber, userSchedule.language);
      }
    }
  }

  private onSelectSlot(slotInfo: any) {
    const { userSchedule } = this.state;
    const { start, end } = slotInfo;

    if(slotInfo.box === undefined){
      const formattedStart = moment(start).format('h:mm a');
      const formattedEnd = moment(end).format('h:mm a');
      const time = formattedStart  + ' - ' + formattedEnd;
      const id = Math.floor(Math.random()*(999-100+1)+100).toString();

      const selectedEvent = {
        id,
        phoneNumber: userSchedule.userPhoneNumber,
        email: userSchedule.userEmail,
        title: '',
        time,
        start,
        end,
        type: 'event'
      }
      
      this.setState({ selectedEvent, showAlert: true, tempStart: start, tempEnd: end, actionPressed: 'new' });
    }
  }

  private onSelectEvent(event: any){
    const { settings } = this.props;
    const { actionPressed, userSchedule } = this.state;
    const today = new Date();
    const maxDate = new Date();
    maxDate.setHours(today.getHours() + parseInt(settings.maxChangeTime, 10));
    const timeStamp = new Date(event.timeStamp);
    timeStamp.setMinutes(timeStamp.getMinutes() + 5);

    const start = moment(event.start).format('h:mm a');
    const end = moment(event.end).format('h:mm a');
    const time = start  + ' - ' + end;

    const selectedEvent = {
      id: event.id,
      phoneNumber: event.phoneNumber,
      email: event.email,
      title: event.title,
      time,
      type: event.type,
      timeStamp: event.timeStamp
    }

    if(actionPressed !== undefined &&  maxDate > event.start && today > timeStamp) {
      this.setState({ actionPressed: 'changeError' });
    }
    else if(actionPressed === undefined && !event.title.includes(language[userSchedule.language].cannotBookHere)){
      this.setState({ actionPressed: 'clicked', showAlert: true, selectedEvent });
    }
    else {
      this.setState({ selectedEvent });
    }
  }

  private onEventGetter(event: any, start: any, end: any, isSelected: boolean) {
    const { schedules } = this.props;
    const { scheduleIndex, userSchedule } = this.state;
    let classObj = { className: '' }
    const blockEvents = schedules[scheduleIndex].events.filter((element:any) => element.createdBy !== userSchedule.userName);
    const ownEvents = schedules[scheduleIndex].events.filter((element:any) => element.createdBy === userSchedule.userName);
    for(let i = 0; i < blockEvents.length; i++){
        const startDate = new Date(blockEvents[i].start);
        const endDate = new Date(blockEvents[i].end);
        if((start >= startDate && end <= endDate) ){
            classObj = { className: 'block-event' }
        }
    }
    for(let i = 0; i < ownEvents.length; i++){
      const startDate = new Date(ownEvents[i].start);
      const endDate = new Date(ownEvents[i].end);
      if((start >= startDate && end <= endDate) ){
          classObj = { className: 'own-event' }
      }
    }
    return classObj;
  }

  private onSlotGetter(date: Date){
    const { settings } = this.props;
    const obj = {
        className: ''
    }
    const maxDate = new Date(Date.now() + (6.04e+8 * settings.maxScheduledTime) );
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
      if(date > maxDate || date < minDate){
        obj.className = 'unselectable-date'
      }
      return obj;
  }

  private onSelecting(range: { start: any, end: any }){
    const { start, end } = range;
    const { scheduleIndex } = this.state;
    const { schedules, settings } = this.props;
    const maxDate = new Date(Date.now() + (6.04e+8 * settings.maxScheduledTime) );
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if((start > maxDate || end > maxDate) || start < yesterday ) {
        return false;
    }

    const events = schedules[scheduleIndex].events;
    if(events){
      for(let i = 0; i < schedules[scheduleIndex].events.length; i++){
          const startDate = new Date(schedules[scheduleIndex].events[i].start);
          const endDate = new Date(schedules[scheduleIndex].events[i].end);
          if((end > startDate && start < startDate) || (start < endDate && end > endDate) || (start >= startDate && end <= endDate)){
            return false;
          }
      }
    }
    return true;
  }

  private addExitButtons() {
    const rbcEvents = document.getElementsByClassName("own-event");
    const createdEventActionsElement="<div id='tempActionsContainer' class='rbc-event-action-container' class='actionEventContainer' />";
    const createdRemoveEventElement="<button id='tempRemove' class='rbc-event-remove'> filler </button>";
    // const createdEditEventElement="<button id='tempEdit' class='rbc-event-edit'> filler </button>";
    for(let i = 0; i < rbcEvents.length; i++){
      const firstChild = (rbcEvents[i].firstChild as any)
      const id = firstChild.id;
      if(!id.includes('actionEventContainer')) {
        rbcEvents[i].insertAdjacentHTML('afterbegin', createdEventActionsElement);
        const eventActionsElement = document.getElementById('tempActionsContainer');
        if(eventActionsElement){
          eventActionsElement.id = ('actionEventContainer');    
          eventActionsElement.insertAdjacentHTML('afterbegin', createdRemoveEventElement);
          const removeEventElement = document.getElementById('tempRemove');
          if(removeEventElement){
            removeEventElement.id = ('removeEvent');
            removeEventElement.addEventListener('click', (e: any) => {
              this.setState({ actionPressed: 'exit', showAlert: true });
            });
          }
          // eventActionsElement.insertAdjacentHTML('afterbegin', createdEditEventElement);
          const editEventElement = document.getElementById('tempEdit');
          if(editEventElement){
            editEventElement.id = ('editEvent');
          }
        }
      }
    }
  }

  private onSignOut() {
    this.props.logoutAction('userAuth');
    location.reload();
  }

  private onChangeSchedule(event: any, index: number){
    this.setState({ scheduleIndex: index }, () => {
      this.addExitButtons();
    });
  }

  private onUpdateLanguage(event: any) {
    const { userSchedule } = this.state;
    const value = event.currentTarget.textContent;
    let lang = 'english';
    if(value.includes('spanish')){
        lang = 'spanish';
    }
    userSchedule.language = lang;
    this.setState({ userSchedule })
  }

  private renderTopBar () { 
    const { schedules, userSchedule } = this.props;
    const { authenticated } = this.state;

    const options = [];
    const classes = 'user-schedule';

    for(let i = 0; i < schedules.length; i++){
        const element = schedules[i];
        options.push(element.title);
    }

    const topBarProps = {
      leftElement: (
        options.length > 1 ?
        <StyledSelect
          className={classes + '-choose-schedule'}
          options={options}
          onChange={this.onChangeSchedule}
        />
        : 
        null
    ),
      centerElement: (
        <Text className={classes + '-title'}>
          {userSchedule.userName ?
            language[userSchedule.language].welcome + ' ' + userSchedule.userName
          :
            language[userSchedule.language].welcome
          }
        </Text>
      ),
      rightElement: (
        <React.Fragment>
          <StyledSelect
            type='primary-color'
            className={classes + '-update-language'}
            value={userSchedule.language}
            options={['english', 'spanish']}
            onChange={this.onUpdateLanguage}
          />
          {authenticated ?
              <StyledButton
                className={classes + '-sign-out'}
                type='white-color'
                text={language[userSchedule.language].signOut}
                onClick={this.onSignOut}
              />
              :
              null
            }
        </React.Fragment>
      )
  }
    return (
      <ToolBar {...topBarProps as any} />
    );
  }
}

const mapStateToProps = (state: any) => {
  const { adminSchedule, settings, auth, userSchedule, global } = state;
  const { authenticated, signinError } = auth;
  const { schedules, error } = adminSchedule;
  const { loading } = global;
  for(let i = 0; i < schedules.length; i++){
    if(schedules[i].events === undefined){
      schedules[i].events = [];
    }
  }
  return { authenticated, signinError, schedules, error, settings, loading, userSchedule };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onGetAdminData: bindActionCreators(
      scheduleActions.onGetAdminData,
      dispatch
    ),
    onGetUserData: bindActionCreators(
      scheduleActions.onGetUserData,
      dispatch
    ),
    onSaveChanges: bindActionCreators(
      scheduleActions.onUpdateSchedule,
      dispatch
    ),
    onUpdateUser: bindActionCreators(
      scheduleActions.onUpdateUser,
      dispatch
    ),
    onCreateUser: bindActionCreators(authActions.onCreateUser, dispatch),
    logoutAction: bindActionCreators(authActions.logoutAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSchedule);
