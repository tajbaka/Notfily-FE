// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { authActions, scheduleActions } from 'src/actions';

import { FloatingInput, StyledButton, StyledSelect, ToolBar } from 'src/components';

import BigCalendar from 'react-big-calendar';

import { Alert, Text } from "@blueprintjs/core";

import * as moment from 'moment';

import "./styles.css";

export interface IUserScheduleProps {
  authenticated: boolean;
  settings: any;
  schedule: any;
  routeProps?: any;
  onSaveChanges: (schedule: any) => (dispatch: Dispatch<any>) => Promise<void>;
  onCreateAccount: (email: string, password: string, authString: string) => (dispatch: Dispatch<any>) => Promise<void>;
  logoutUserAction: (authString?: string) => (dispatch: Dispatch<any>) => Promise<void>;
}

interface IUserScheduleState {
  authenticated: boolean;
  actionPressed?: string;
  localizer: any;
  timeSlots: number;
  selectedEvent?: any;
  showAlert: boolean;
  tempStart?: Date;
  tempEnd?: Date;
  currentSchedule: any;
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

    const { schedule, settings } = this.props;
    let { authenticated } = this.props;
    const timeSlots = 60/settings.timeSplit;

    const currentSchedule = JSON.parse(JSON.stringify(schedule.schedules[0]));

    const events = currentSchedule.events;

    const auth = localStorage.getItem('userAuth');
    if(auth !== null) {
      authenticated = true;
    }

    for(let i = 0; i < events.length; i++ ){
        events[i].start = new Date(events[i].start);
        events[i].end = new Date(events[i].end);
    }

    this.state = {
        authenticated,
        currentSchedule,
        localizer,
        showAlert: false,
        timeSlots
    }
  }

  public componentWillReceiveProps(nextProps: IUserScheduleProps){
    if(nextProps.authenticated !== this.props.authenticated){
      this.setState({ authenticated: nextProps.authenticated });
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
    const { schedule, settings } = this.props;
    const { authenticated, actionPressed, currentSchedule, localizer, timeSlots, selectedEvent, showAlert, tempStart, tempEnd } = this.state;
    const startTime = moment(settings.startTime, 'h: mm a').toDate();
    const endTime = moment(settings.endTime, 'h: mm a').toDate();

    return (
      <div className={classNames(classes)}>
          {this.renderTopBar(classes)}
          <div className={classes + '-inner-container'}>
            <BigCalendar
              localizer={localizer}
              events={currentSchedule.events}
              min={startTime}
              max={endTime}
              slotPropGetter={this.onSlotGetter}
              onView={e => setTimeout(() => {
                  this.addExitButtons()
              }, 50)}
              onNavigate={e => setTimeout(() => {
                  this.addExitButtons()
              }, 50)}
              timeslots={timeSlots}
              eventPropGetter={this.onEventGetter}
              onSelectEvent={this.onSelectEvent}
              selectable={true}
              defaultView='week'
              views={['week', 'day']}
              onSelecting={this.onSelecting}
              onSelectSlot={this.onSelectSlot}
            />
            {actionPressed === 'exit' &&
              <Alert
                className={classNames("generic-alert", classes + '-alert')}
                cancelButtonText="No"
                confirmButtonText="Yes"
                isOpen={showAlert}
                canOutsideClickCancel={true}
                onCancel={this.onAlertCancel}
                onConfirm={this.onAlertConfirm}
              >   
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> Are you sure you want to delete? </Text>
                </div>
              </Alert>
            }
            {actionPressed === 'error' &&
              <Alert
                className={classNames("generic-alert", classes + '-alert')}
                confirmButtonText="Ok"
                isOpen={showAlert}
                canOutsideClickCancel={true}
                onConfirm={this.onAlertCancel}
              >   
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> Appointment cannot be changed { settings.maxChangeTime } hours before </Text>
                </div>
              </Alert>
            }
            {(!authenticated && tempStart && tempEnd) &&
              <Alert
                className={classNames("generic-alert", classes + '-alert')}
                cancelButtonText="Cancel"
                confirmButtonText="Confirm"
                isOpen={showAlert}
                canOutsideClickCancel={true}
                onCancel={this.onAlertCancel}
                onConfirm={this.onAlertConfirm}
              >   
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> Edit Event </Text>
                  <Text className={classes + '-alert-input-label'}> EVENT TITLE </Text>
                  <div className={classes + '-alert-input-container'}>
                    <Text className={classes + '-alert-input-fixed'}> Arian Taj Event </Text>
                    <FloatingInput
                      className={classes + '-alert-input'}
                      autoCapitalize="none"
                      autoCorrect="none"
                      maxCounter={50}
                      floatingType="settings"
                      value={selectedEvent.title.replace('Arian Taj Event', '')}
                      onChange={(e: any) => this.onAlertInputChanged(e)}
                      placeholder=""
                      tabIndex={1}
                    />
                  </div>
                  <FloatingInput
                    className={classes + '-alert-input'}
                    autoCapitalize="none"
                    autoCorrect="none"
                    required={true}
                    floatingType="settings"
                    value={schedule.userName}
                    onChange={(e: any) => this.onAlertSignInputChanged(e, 'userName')}
                    placeholder="NAME"
                    tabIndex={1}
                  />
                  <FloatingInput
                    className={classes + '-alert-input'}
                    autoCapitalize="none"
                    autoCorrect="none"
                    required={true}
                    floatingType="settings"
                    value={schedule.userEmail}
                    onChange={(e: any) => this.onAlertSignInputChanged(e, 'userEmail')}
                    placeholder="EMAIL"
                    tabIndex={1}
                  />
                  <FloatingInput
                    className={classes + '-alert-input'}
                    autoCapitalize="none"
                    autoCorrect="none"
                    required={true}
                    floatingType="settings"
                    value={schedule.userPhoneNumber}
                    onChange={(e: any) => this.onAlertSignInputChanged(e, 'userPhoneNumber')}
                    placeholder="PHONE NUMBER"
                    tabIndex={1}
                  />
                </div>
              </Alert>
            }
            {(actionPressed === 'edit' || (tempStart && tempEnd && authenticated)) && selectedEvent &&
              <Alert
                className={classNames("generic-alert", classes + '-alert')}
                cancelButtonText="Cancel"
                confirmButtonText="Confirm"
                isOpen={showAlert}
                canOutsideClickCancel={true}
                onCancel={this.onAlertCancel}
                onConfirm={this.onAlertConfirm}
              >   
                <div className={classes + '-alert-inner-container'}>
                  <Text className={classes + '-alert-title'}> Edit Event </Text>
                  <Text className={classes + '-alert-input-label'}> EVENT TITLE </Text>
                  <div className={classes + '-alert-input-container'}>
                    <Text className={classes + '-alert-input-fixed'}> Arian Taj Event </Text>
                    <FloatingInput
                        className={classes + '-alert-input'}
                        autoCapitalize="none"
                        autoCorrect="none"
                        maxCounter={50}
                        floatingType="settings"
                        value={selectedEvent.title.replace('Arian Taj Event', '')}
                        onChange={(e: any) => this.onAlertInputChanged(e)}
                        placeholder=""
                        tabIndex={1}
                    />
                  </div>
                </div>
              </Alert>
            }
          </div>
      </div>
    );
  }

  private onAlertSignInputChanged(event: any, type: string){
    const { schedule } = this.props;
    const value = event.currentTarget.value;
    schedule[type] = value;
    this.props.onSaveChanges(schedule);
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
    const { schedule } = this.props;
    const { actionPressed, currentSchedule, selectedEvent, tempEnd, tempStart } = this.state;

    if(actionPressed === 'exit'){
      const index = currentSchedule.events.findIndex((ele: any) => ele.id === selectedEvent.id);
      if(index !== undefined){
          currentSchedule.events.splice(index, 1);
      }
      this.props.onSaveChanges(schedule);
      this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false })
    }
    else if(actionPressed === 'edit'){
      const index = currentSchedule.events.findIndex((ele: any) => ele.id === selectedEvent.id);
      if(index !== undefined){
          let title = selectedEvent.title;
          if(!title.includes('Arian Taj Event')){
              title = 'Arian Taj Event \n' + title;
          }
          currentSchedule.events[index].title = title;
      }
      this.props.onSaveChanges(schedule);
      this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false })
    }
    else if(actionPressed === undefined && tempStart && tempEnd){
      let title = selectedEvent.title;
        if(!title.includes('Arian Taj Event')){
            title = 'Arian Taj Event \n' + title;
        }
      const event = { id: selectedEvent.id, start: selectedEvent.start, end: selectedEvent.end, title, type: selectedEvent.type, timeStamp: new Date() };
      currentSchedule.events.push(event);
      this.props.onSaveChanges(schedule);
      this.setState({ selectedEvent: undefined, showAlert: false, tempStart: undefined, tempEnd: undefined }, () => {
          this.addExitButtons();
          this.props.onCreateAccount(schedule.userEmail, 'testing', 'userAuth');
          schedule.userName = '';
          schedule.userEmail = '';
          schedule.userPhoneNumber = '';
        this.props.onSaveChanges(schedule);
      });
    }
  }

  private onSelectEvent(event: any){
    const { settings } = this.props;
    const { actionPressed } = this.state;
    const today = new Date();
    const maxDate = new Date();
    maxDate.setHours(today.getHours() + settings.maxChangeTime);

    const timeStamp = new Date(event.timeStamp);
    timeStamp.setMinutes(timeStamp.getMinutes() + 1);

    if(actionPressed !== undefined && maxDate > event.start && today > timeStamp ) {
      this.setState({ actionPressed: 'error' })
    }
    else {
      const start = moment(event.start).format('h:mm a');
      const end = moment(event.end).format('h:mm a');

      const time = start  + ' - ' + end;
      const selectedEvent = {
        id: event.id,
        phoneNumber: '(289) 212-2592',
        email: 'ariant2015@gmail.com',
        title: event.title,
        time,
        timeStamp: event.timeStamp
      }
      this.setState({ selectedEvent });
    }
  }

  private onEventGetter(event: any, start: any, end: any, isSelected: boolean) {
    const { currentSchedule } = this.state;
    let classObj = { className: '' }
    const blockEvents = currentSchedule.events.filter((element:any) => element.type === 'block');
    for(let i = 0; i < blockEvents.length; i++){
        const startDate = new Date(blockEvents[i].start);
        const endDate = new Date(blockEvents[i].end);
        if((start >= startDate && end <= endDate) ){
            classObj = { className: 'block-event' }
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
      if(date > maxDate){
        obj.className = 'max-date'
      }
      return obj;
  }

  private onSelecting(range: { start: any, end: any }){
    const { start, end } = range;
    const { currentSchedule } = this.state;

    const { settings } = this.props;
    const maxDate = new Date(Date.now() + (6.04e+8 * settings.maxScheduledTime) );
    if(start > maxDate  ) {
        return false;
    }

    for(let i = 0; i < currentSchedule.events.length; i++){
        const startDate = new Date(currentSchedule.events[i].start);
        const endDate = new Date(currentSchedule.events[i].end);
        if((end > startDate && start < startDate) || (start < endDate && end > endDate) || (start >= startDate && end <= endDate)){
          return false;
        }
    }
    return true;
  }

  private addExitButtons() {
    const rbcEvents = document.getElementsByClassName("rbc-event");
    const createdEventActionsElement="<div id='tempActionsContainer' class='rbc-event-action-container' class='actionEventContainer' />";
    const createdRemoveEventElement="<button id='tempRemove' class='rbc-event-remove'> filler </button>";
    const createdEditEventElement="<button id='tempEdit' class='rbc-event-edit'> filler </button>";
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
          eventActionsElement.insertAdjacentHTML('afterbegin', createdEditEventElement);
          const editEventElement = document.getElementById('tempEdit');
          if(editEventElement){
            editEventElement.id = ('editEvent');
            editEventElement.addEventListener('click', (e: any) => {
              this.setState({ actionPressed: 'edit', showAlert: true });
            });
          }
        }
      }
    }
  }

  private onSignOut() {
    const { routeProps } = this.props;
    routeProps.history.push('/user-signout');
    // this.props.logoutUserAction('userAuth');
    const currentSchedule = JSON.parse(JSON.stringify(this.props.schedule.schedules[0]));
    this.setState({ currentSchedule })
  }

  private onChangeSchedule(event: any){
    const { schedule } = this.props;
    const title = event.currentTarget.textContent.substring(1, event.currentTarget.textContent.length-1);;
    const index = schedule.schedules.findIndex((ele: any) => ele.title === title);
    const currentSchedule = schedule.schedules[index];
    this.setState({ currentSchedule });
  }

  private renderTopBar (classes: string) {
    const { schedule } = this.props;
    const { authenticated } = this.state;
    const options = [];

    for(let i = 0; i < schedule.schedules.length; i++){
        const element = schedule.schedules[i];
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
          Welcome {schedule.userName}
        </Text>
      ),
      rightElement: (
        authenticated ?
          <StyledButton
            className={classes + '-sign-out'}
            type='white-color'
            text='Sign Out'
            onClick={this.onSignOut}
          />
          :
          null
      )
  }
    return (
      <ToolBar {...topBarProps as any} />
    );
  }

  private onSelectSlot(slotInfo: any) {
    const { start, end } = slotInfo;
    const formattedStart = moment(start).format('h:mm a');
    const formattedEnd = moment(end).format('h:mm a');
    const time = formattedStart  + ' - ' + formattedEnd;
    const id = Math.floor(Math.random()*(999-100+1)+100).toString();

    const selectedEvent = {
      id,
      phoneNumber: '(289) 212-2592',
      email: 'ariant2015@gmail.com',
      title: 'Arian Taj Event',
      time,
      start,
      end
    }
    this.setState({ selectedEvent, showAlert: true, tempStart: start, tempEnd: end })
  }
}

const mapStateToProps = (state: any) => {
  const { schedule, settings, auth } = state;
  const { authenticated } = auth;
  return { authenticated, schedule, settings };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onSaveChanges: bindActionCreators(
      scheduleActions.onUpdateSchedule,
      dispatch
    ),
    onCreateAccount: bindActionCreators(authActions.onCreateAction, dispatch),
    logoutUserAction: bindActionCreators(authActions.logoutUserAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSchedule);
