// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { scheduleActions } from 'src/actions';

import { Redirect } from "react-router-dom";

import { StyledButton, StyledSelect, ToolBar } from 'src/components';

import { language } from '../';

import BigCalendar from 'react-big-calendar';

import { Spinner, Text } from "@blueprintjs/core";

import { AdminScheduleAlerts } from './components';

import * as moment from 'moment';

import "./styles.css";

export interface IAdminScheduleProps {
  settings: any;
  schedules: any;
  error: string;
  loading: boolean;
  routeProps?: any;
  onGetAdminData: (adminUid:string) => (dispatch: Dispatch<any>) => Promise<void>;
  onSaveChanges: (schedule: any, adminUid: string) => (dispatch: Dispatch<any>) => Promise<void>;
}

interface IAdminScheduleState {
  adminUid: string;
  actionPressed?: string;
  actionValue: any;
  localizer: any;
  timeSlots: number;
  selectedEvent?: any;
  showAlert: boolean;
  scheduleIndex: number;
  startTime?: number;
  endTime?: number;
  view: any;
}

export class AdminSchedule extends React.Component<IAdminScheduleProps, IAdminScheduleState> {

  constructor(props: IAdminScheduleProps) {
    super(props);
    const localizer = BigCalendar.momentLocalizer(moment);
    this.onSelecting = this.onSelecting.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.onActionChange = this.onActionChange.bind(this);
    this.onEventGetter = this.onEventGetter.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onAlertConfirm = this.onAlertConfirm.bind(this);
    this.onAlertCancel = this.onAlertCancel.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onChangeSchedule = this.onChangeSchedule.bind(this);
    this.onAlertInputChanged = this.onAlertInputChanged.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.getAvailableTimes = this.getAvailableTimes.bind(this);
    this.getTodaysEvents = this.getTodaysEvents.bind(this);
    this.onSlotGetter = this.onSlotGetter.bind(this);

    let auth = localStorage.getItem('adminAuth');
    auth = auth && JSON.parse(auth);
    const adminUid = auth && (auth as any).user.uid;

    this.props.onGetAdminData(adminUid);
    
    const { settings } = this.props;
    const timeSlots = 60/settings.timeSplit;

    const isMobile = window.innerWidth <= 480;

    this.state = {
        adminUid,
        scheduleIndex: 0,
        actionValue: language[settings.language].block,
        localizer,
        showAlert: false,
        timeSlots,
        view: isMobile ? 'day' : 'week'
    }
  }

  public componentWillReceiveProps(nextProps: any) {
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
    if(this.props.settings !== nextProps.settings){
        const timeSlots = 60/nextProps.settings.timeSplit;
        let actionValue = this.state.actionValue;
        let actionString = 'addEvent';
        if(actionValue.includes(language[nextProps.settings.language].block)){
            actionString = 'block';
        }
        actionValue = language[nextProps.settings.language][actionString];
        this.setState({ timeSlots, actionValue });
    }
  }

  public componentDidMount(){
    if(!this.props.loading){
        const toolBarGroups = document.getElementsByClassName("rbc-btn-group");
        const navBar = toolBarGroups[0];
        if(navBar){
            const navButtons = navBar.childNodes;
            navButtons[1].textContent = '<';
            navButtons[2].textContent = '>';
            this.addExitButtons();
        }
    }
  }

  public render() {
    const classes = 'admin-schedule';
    const { settings, schedules, error, loading } = this.props;
    const { actionPressed, actionValue, scheduleIndex, localizer, selectedEvent, showAlert, view } = this.state;
    const startTime = moment(settings.startTime, 'h: mm a').toDate();
    const endTime = moment(settings.endTime, 'h: mm a').toDate();
    const events = schedules[scheduleIndex].events;
    if(events){
        for(let i = 0; i < events.length; i++){
            events[i].start = new Date(events[i].start);
            events[i].end = new Date(events[i].end);
            if(events[i].type === 'block'){
                events[i].title = language[settings.language].cannotBookHere;
            }
        }
    }

    if(error){
        return(
            <Redirect to="/error" />
        );
    }

    return (
        <div className={classNames(classes)}>
            {loading && <Spinner className={classes + '-spinner'} size={30} />}
            {this.renderTopBar()}
            <div className={classNames(classes + '-inner-container', view)}>
                <div className={classes + '-actions-container'}>
                    <div className={classes + '-actions'}>
                        <StyledSelect
                            className={classes + '-actions-select'}
                            type='primary-color'
                            onChange={this.onActionChange}
                            value={actionValue}
                            options={[language[settings.language].block, language[settings.language].addEvent]}
                        />
                    </div>
                </div>
                <BigCalendar
                    className={classNames(classes + '-rbc-calendar', settings.language)}
                    localizer={localizer}
                    events={events || []}
                    min={startTime}
                    max={endTime}
                    longPressThreshold={0}
                    onView={newView => setTimeout(() => {
                        this.setState({ view: newView })
                        this.addExitButtons()
                    }, 50)}
                    onNavigate={e => setTimeout(() => {
                        this.addExitButtons()
                    }, 50)}
                    slotPropGetter={this.onSlotGetter}
                    timeslots={1}
                    eventPropGetter={this.onEventGetter}
                    onSelectEvent={this.onSelectEvent}
                    selectable={true}
                    defaultView={view}
                    views={['week', 'day']}
                    onSelecting={this.onSelecting}
                    onSelectSlot={this.onSelectSlot}
                />
                <AdminScheduleAlerts
                    settings={settings}
                    actionPressed={actionPressed}
                    selectedEvent={selectedEvent}
                    showAlert={showAlert}
                    onAlertCancel={this.onAlertCancel}
                    onAlertConfirm={this.onAlertConfirm}
                    onAlertInputChanged={this.onAlertInputChanged}
                />
            </div>
        </div>
    );
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
    const { adminUid, scheduleIndex, actionPressed, selectedEvent } = this.state;
    const { schedules } = this.props;
    if(actionPressed === 'exit'){
        const index = schedules[scheduleIndex].events.findIndex((ele: any) => ele.id === selectedEvent.id);
        if(index !== undefined){
            schedules[scheduleIndex].events.splice(index, 1);
        }
        this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false }, () => {
            this.props.onSaveChanges(schedules, adminUid);
        });
    }
    else if(actionPressed === 'clicked'){
        const index = schedules[scheduleIndex].events.findIndex((ele: any) => ele.id === selectedEvent.id);
        if(index !== undefined){
            const title = selectedEvent.title;
            let changesMade = false;
            if(title !== schedules[scheduleIndex].events[index].title){
                changesMade = true;
            }
            schedules[scheduleIndex].events[index].title = title;
            schedules[scheduleIndex].events[index].description = selectedEvent.description;
            const descriptionElement = document.getElementById('description-' + selectedEvent.id);
            if(descriptionElement){
                descriptionElement.innerHTML = selectedEvent.description;
            }
            if(changesMade){
                this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false }, () => {
                    this.props.onSaveChanges(schedules, adminUid);
                });
            }
            else {
                this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false });
            }
        }
    }
    else if(actionPressed === 'new'){
        schedules[scheduleIndex].events.push(selectedEvent);
        this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false }, () => {
            this.props.onSaveChanges(schedules, adminUid);
        });
    }
    
  }

  private onSelectEvent(event: any){
    setTimeout(() => {
        const { actionPressed } = this.state;
        const start = moment(event.start).format('h:mm a');
        const end = moment(event.end).format('h:mm a');
        const time = start  + ' - ' + end;
        const selectedEvent = {
            id: event.id,
            phoneNumber: event.phoneNumber,
            email: event.email,
            title: event.title,
            description: event.description,
            time
        }
        if(actionPressed === undefined && !event.title.includes(language[this.props.settings.language].cannotBookHere)){
            this.setState({ actionPressed: 'clicked', showAlert: true, selectedEvent });
            const todaysEvents = this.getTodaysEvents(event);
            this.getAvailableTimes(event, todaysEvents);
            // const index = todaysEvents.findIndex((ele:any) => ele.start === event.start );
            // const alertStartDate = moment(this.props.settings.startTime, 'h: mm a').toDate();
            // const alertEndDate = moment(this.props.settings.endTime, 'h: mm a').toDate();
        
            // if(index - 1 >= 0){
            //     alertStartDate = todaysEvents[index - 1].end;
            // }   
            // if(index + 1 <= todaysEvents.length - 1) {
            //     alertEndDate  = todaysEvents[index + 1].start;
            // }
            // const alertStartTime = moment(alertStartDate).format('hh:mm');
            // const alertEndTime = moment(alertEndDate).format('hh:mm');
            }
        else {
            this.setState({ selectedEvent, showAlert: true });
        }
    }, 50);
  }

  private getAvailableTimes(event: any, todaysEvents: any) {
    const { settings } = this.props;
    const startDate = moment(settings.startTime, 'h: mm a').toDate();
    const endDate = moment(settings.endTime, 'h: mm a').toDate();
    const startTime = moment(startDate).format('hh:mm');
    const endTime = moment(endDate).format('hh:mm');
    const diff = parseInt(endTime, 10) - parseInt(startTime, 10);
    const increments = (diff * 60)/settings.timeSplit;
    const availableTimes = [];
    const nextTime = startDate;
    for(let i = 0; i <= increments; i++){
        console.log(moment(nextTime).format('hh:mm'));
        availableTimes.push(nextTime);
        nextTime.setMinutes(nextTime.getMinutes() + parseInt(settings.timeSplit, 10));
    }

  }

  private getTodaysEvents(event: any) {
    const { scheduleIndex } = this.state;
    const { schedules } = this.props;
    const events = schedules[scheduleIndex].events;
    const todaysEvents = [];
    for(let i = 0; i < events.length; i++){
        const startTime = new Date(events[i].start);
        const eventStart = new Date(event.start);
        if(this.isToday(startTime, eventStart)) {
            todaysEvents.push(events[i])
        }   
    }
    todaysEvents.sort((dateA: any,dateB: any) => (dateA.start > dateB.start) ? 1 : ((dateB.start > dateA.start) ? -1 : 0)); 
    return todaysEvents;
  }

  private isToday(someDate: Date, today: Date) {
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
  }

  private onEventGetter(event: any, start: any, end: any, isSelected: boolean) {
    const { scheduleIndex } = this.state;
    const { schedules } = this.props;
    let classObj = { className: '' }
    const blockEvents = schedules[scheduleIndex].events.filter((element:any) => element.type === 'block');
    const otherEvents = schedules[scheduleIndex].events.filter((element:any) => element.type === 'event');
    for(let i = 0; i < blockEvents.length; i++){
        const startDate = new Date(blockEvents[i].start);
        const endDate = new Date(blockEvents[i].end);
        if((start >= startDate && end <= endDate) ){
            classObj = { className: 'block-event' }
        }
    }
    for(let i = 0; i < otherEvents.length; i++){
        const startDate = new Date(otherEvents[i].start);
        const endDate = new Date(otherEvents[i].end);
        if((start >= startDate && end <= endDate) ){
            classObj = { className: 'other-events' }
        }
    }
    return classObj;
  }

  private onActionChange(event: any){
    this.setState({ actionValue: event.currentTarget.textContent });
  }

  private onSlotGetter(date: Date){
    const obj = {
        className: ''
    }
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
    if(date < minDate){
    obj.className = 'unselectable-date'
    }
    return obj;
  }

  private onSelecting(range: { start: any, end: any }){
    const { start, end } = range;
    const { actionValue, scheduleIndex } = this.state;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if(start < yesterday ) {
        return false;
    }

    const { schedules, settings } = this.props;
    const events = schedules[scheduleIndex].events;
    if(events){
        for(let i = 0; i < events.length; i++){
            const startDate = new Date(schedules[scheduleIndex].events[i].start);
            const endDate = new Date(schedules[scheduleIndex].events[i].end);
            if(actionValue.includes(language[settings.language].addEvent)){
                if((end > startDate && start < startDate) || (start < endDate && end > endDate) || (start >= startDate && end <= endDate)){
                    if(schedules[scheduleIndex].events[i].type === 'block'){
                        return false;
                    }
                    else if(schedules[scheduleIndex].events[i].type === 'event'){
                        return false;
                    }
                }
            }
            else if(actionValue.includes(language[settings.language].block)) {
                if(start >= startDate && end <= endDate){
                    return false;
                }
            }
        }
    }
    return true;
  }

  private addExitButtons() {
    const rbcEvents = document.getElementsByClassName("rbc-event");
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
                        setTimeout(() => {
                            this.setState({ actionPressed: 'exit' });
                        }, 20);
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

  private onSettingsClick() {
    const { routeProps } = this.props;
    routeProps.history.push('/settings');
  }

  private onChangeSchedule(event: any, index: number){
    this.setState({ scheduleIndex: index }, () => {
        this.addExitButtons();
    });
  }

  private onSignOut() {
    const { routeProps } = this.props;
    routeProps.history.push('/signout');
  }

  private renderTopBar () {
    const { schedules, settings } = this.props;
    const { scheduleIndex } = this.state;
    const classes = 'admin-schedule';
    const scheduleOptions = [];

    for(let i = 0; i < schedules.length; i++){
        const element = schedules[i];
        scheduleOptions.push(element.title);
    }

    const topBarProps = {
      leftElement: (
          scheduleOptions.length > 1 ?
          <StyledSelect
            type='primary-color'
            className={classes + '-choose-schedule'}
            options={scheduleOptions}
            onChange={this.onChangeSchedule}
          />
          : 
          null
      ),
      centerElement: (
        <Text className={classes + '-title'}>
            {language[settings.language].welcome + ' ' + schedules[scheduleIndex].title}
        </Text>
      ),
      rightElement: (
        <React.Fragment>
            <StyledButton
                className={classes + '-settings'}
                name='gear'
                onClick={this.onSettingsClick}
                useTest={true}
            />
            <StyledButton
                className={classes + '-sign-out'}
                type='white-color'
                text={language[settings.language].signOut}
                onClick={this.onSignOut}
            />
        </React.Fragment>
      )
  }
    return (
      <ToolBar {...topBarProps as any} />
    );
  }

  private onSelectSlot(slotInfo: any) {
    const { start, end } = slotInfo;
    const { adminUid, actionValue, scheduleIndex } = this.state;
    const { schedules, settings } = this.props;

    if(slotInfo.box === undefined){
        if(schedules[scheduleIndex].events === undefined){
            schedules[scheduleIndex].events = [];
        }
        if(actionValue.includes(language[settings.language].block)) {
            let inList = false;
            const blockEvents = schedules[scheduleIndex].events.filter((element:any) => element.type === 'block');
            for(let i = 0; i < blockEvents.length; i++){
                const startDate = new Date(blockEvents[i].start);
                const endDate = new Date(blockEvents[i].end);
                if((start >= startDate && start <= endDate && end >= endDate) ){
                    inList = true;
                    blockEvents[i].end = end;
                    this.props.onSaveChanges(schedules, adminUid);
                }
                else if(start <= startDate && end >= startDate && end <= endDate) {
                    inList = true;
                    blockEvents[i].start = start;
                    this.props.onSaveChanges(schedules, adminUid);
                }
                else if(start <= startDate && end >= endDate) {
                    inList = true;
                    blockEvents[i].start = start;
                    blockEvents[i].end = end;
                    this.props.onSaveChanges(schedules, adminUid);
                }
            }
            if(!inList){
                const id = Math.floor(Math.random()*(999-100+1)+100).toString();
                const selectionDate = { id, start, end, title: language[settings.language].cannotBookHere, type: 'block', createdBy: schedules[scheduleIndex].title }
                schedules[scheduleIndex].events.push(selectionDate);
                this.props.onSaveChanges(schedules, adminUid);
            }
        }
        else if(actionValue.includes(language[settings.language].addEvent)){
            const id = Math.floor(Math.random()*(999-100+1)+100).toString();
            const selectedEvent = { id, start, end, title: '', type: 'event', createdBy: schedules[scheduleIndex].title }
            this.setState({ selectedEvent, showAlert: true, actionPressed: 'new' });
        }
    }
  }
}

const mapStateToProps = (state: any) => {
  const { adminSchedule, settings, global } = state;
  const { schedules, error } = adminSchedule;
  const { loading } = global;
  return { schedules, settings, loading, error };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => { 
  return {
    onGetAdminData: bindActionCreators(
        scheduleActions.onGetAdminData,
        dispatch
    ),
    onSaveChanges: bindActionCreators(
        scheduleActions.onUpdateSchedule,
        dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSchedule);
