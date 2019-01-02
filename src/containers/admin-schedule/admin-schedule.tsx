// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { scheduleActions } from 'src/actions';

import { FloatingInput, StyledButton, StyledSelect, ToolBar } from 'src/components';

import BigCalendar from 'react-big-calendar';

import { Alert, Text } from "@blueprintjs/core";

import * as moment from 'moment';

import "./styles.css";

export interface IAdminScheduleProps {
  settings: any;
  schedule: any;
  routeProps?: any;
  onSaveChanges: (schedule: any) => (dispatch: Dispatch<any>) => Promise<void>;
}

interface IAdminScheduleState {
  actionPressed?: string;
  actionValue: any;
  localizer: any;
  timeSlots: number;
  selectedEvent?: any;
  showAlert: boolean;
  currentSchedule: any;
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
    this.onSignOut = this.onSignOut.bind(this);
    this.onSettingsClick = this.onSettingsClick.bind(this);
    this.onChangeSchedule = this.onChangeSchedule.bind(this);

    const { schedule, settings } = this.props;

    const currentSchedule = schedule.schedules[0];

    const events = currentSchedule.events;

    for(let i = 0; i < events.length; i++ ){
        events[i].start = new Date(events[i].start);
        events[i].end = new Date(events[i].end);
    }

    const timeSlots = 60/settings.timeSplit;

    this.state = {
        currentSchedule,
        actionValue: 'Block',
        localizer,
        showAlert: false,
        timeSlots
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
    const classes = 'admin-schedule';
    const { settings } = this.props;
    const { actionPressed, actionValue, currentSchedule, localizer, timeSlots, selectedEvent, showAlert } = this.state;
    const startTime = moment(settings.startTime, 'h: mm a').toDate();
    const endTime = moment(settings.endTime, 'h: mm a').toDate();
    return (
        <div className={classNames(classes)}>
            {this.renderTopBar(classes)}
            <div className={classes + '-inner-container'}>
                <div className={classes + '-actions-container'}>
                <div className={classes + '-actions'}>
                    <StyledSelect
                        className={classes + '-actions-select'}
                        type='primary-color'
                        onChange={this.onActionChange}
                        value={actionValue}
                        options={['Block', 'Add Event']}
                    />
                </div>
            </div>
                <BigCalendar
                    localizer={localizer}
                    events={currentSchedule.events}
                    min={startTime}
                    max={endTime}
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
                {actionPressed === undefined && selectedEvent &&
                    <Alert
                        className={classNames("generic-alert", classes + '-alert')}
                        confirmButtonText="Ok"
                        isOpen={showAlert}
                        canOutsideClickCancel={true}
                        onConfirm={this.onAlertCancel}
                    >
                        <div className={classes + '-alert-inner-container'}>
                            <Text className={classes + '-alert-title'}> Alert Details </Text>
                            <div className={classes + '-alert-details-container'}>
                                <div className={classes + '-alert-details-labels'}>
                                    <Text className={classes + '-alert-label'}> TIME </Text>
                                    <Text className={classes + '-alert-label'}> TITLE </Text>
                                    <Text className={classes + '-alert-label'}> PHONE </Text>
                                    <Text className={classes + '-alert-label'}> EMAIL </Text>
                                </div>
                                <div className={classes + '-alert-details'}>
                                    <Text className={classes + '-alert-detail'}> { selectedEvent.time } </Text>
                                    <Text className={classes + '-alert-detail'}> { selectedEvent.title } </Text>
                                    <Text className={classes + '-alert-detail'}> { selectedEvent.phoneNumber } </Text>
                                    <Text className={classes + '-alert-detail'}> { selectedEvent.email } </Text>
                                </div>
                            </div>
                        </div>
                    </Alert>
                }
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
                {actionPressed === 'edit' &&
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
                            {/* <Text className={classes + '-alert-time'}> <span> TIME </span> { selectedEvent.time } </Text> */}
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
    const { currentSchedule, actionPressed, selectedEvent } = this.state;
    const { schedule } = this.props;
    if(actionPressed === 'exit'){
        const index = currentSchedule.events.findIndex((ele: any) => ele.id === selectedEvent.id);
        if(index !== undefined){
            currentSchedule.events.splice(index, 1);
        }
    }
    else if(actionPressed === 'edit'){
        const index = currentSchedule.events.findIndex((ele: any) => ele.id === selectedEvent.id);
        if(index !== undefined){
            let title = selectedEvent.title;
            if(!title.includes('Arian Taj Event')){
                title = 'Arian Taj Event \n' + title;
            }
            currentSchedule.events[index].title = title;
            currentSchedule.events[index].description = selectedEvent.description;
            const descriptionElement = document.getElementById('description-' + selectedEvent.id);
            if(descriptionElement){
                descriptionElement.innerHTML = selectedEvent.description;
            }
        }
    }
    this.props.onSaveChanges(schedule);
    this.setState({ actionPressed: undefined, selectedEvent: undefined, showAlert: false }, () => {
        this.props.onSaveChanges(schedule);
    })
  }

  private onSelectEvent(event: any){
    const { actionPressed } = this.state;
    const start = moment(event.start).format('h:mm a');
    const end = moment(event.end).format('h:mm a');
    const time = start  + ' - ' + end;
    const selectedEvent = {
        id: event.id,
        phoneNumber: '(289) 212-2592',
        email: 'ariant2015@gmail.com',
        title: event.title,
        description: event.description,
        time
    }
    this.setState({ selectedEvent });
    if(actionPressed === undefined){
        this.setState({ showAlert: true });
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

  private onActionChange(event: any){
    this.setState({ actionValue: event.currentTarget.textContent });
  }

  private onSelecting(range: { start: any, end: any }){
    const { start, end } = range;
    const { actionValue, currentSchedule } = this.state;
        for(let i = 0; i < currentSchedule.events.length; i++){
            const startDate = new Date(currentSchedule.events[i].start);
            const endDate = new Date(currentSchedule.events[i].end);
            if(actionValue.includes('Add Event')){
                if((end > startDate && start < startDate) || (start < endDate && end > endDate) || (start >= startDate && end <= endDate)){
                    if(currentSchedule.events[i].type === 'block'){
                        return false;
                    }
                    else if(currentSchedule.events[i].type === 'event'){
                        return false;
                    }
                }
            }
            else if(actionValue.includes('Block')) {
                if(start >= startDate && end <= endDate){
                    return false;
                }
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
                        setTimeout(() => {
                            this.setState({ actionPressed: 'exit', showAlert: true });
                        }, 20);
                    });
                }
                eventActionsElement.insertAdjacentHTML('afterbegin', createdEditEventElement);
                const editEventElement = document.getElementById('tempEdit');
                if(editEventElement){
                    editEventElement.id = ('editEvent');
                    editEventElement.addEventListener('click', (e: any) => {
                        setTimeout(() => {
                            this.setState({ actionPressed: 'edit', showAlert: true });
                        }, 20);
                    });
                }
            }
        }
    }
  }

  private onSettingsClick() {
    const { routeProps } = this.props;
    routeProps.history.push('/settings');
  }

  private onSignOut() {
    const { routeProps } = this.props;
    routeProps.history.push('/signout');
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
    const { currentSchedule } = this.state;

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
          Welcome {currentSchedule.title}
        </Text>
      ),
      rightElement: (
        <React.Fragment>
            <StyledButton
                className={classes + '-settings'}
                name='gear-white-selected'
                onClick={this.onSettingsClick}
                useTest={true}
            />
            <StyledButton
                className={classes + '-sign-out'}
                type='white-color'
                text='Sign Out'
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
    const { actionValue, currentSchedule } = this.state;
    const { schedule } = this.props;
    const blockEvents = currentSchedule.events.filter((element:any) => element.type === 'block');
    if(actionValue.includes('Block')) {
        let inList = false;
        for(let i = 0; i < blockEvents.length; i++){
            const startDate = new Date(blockEvents[i].start);
            const endDate = new Date(blockEvents[i].end);
            if((start >= startDate && start <= endDate && end >= endDate) ){
                inList = true;
                blockEvents[i].end = end;
                this.props.onSaveChanges(schedule);
            }
            else if(start <= startDate && end >= startDate && end <= endDate) {
                inList = true;
                blockEvents[i].start = start;
                this.props.onSaveChanges(schedule);
            }
            else if(start <= startDate && end >= endDate) {
                inList = true;
                blockEvents[i].start = start;
                blockEvents[i].end = end;
                this.props.onSaveChanges(schedule);
            }
        }
        if(!inList){
            const id = Math.floor(Math.random()*(999-100+1)+100).toString();
            const selectionDate = { id, start, end, title: 'Cannot book here', type: 'block' }
            currentSchedule.events.push(selectionDate);
            this.props.onSaveChanges(schedule);
            this.addExitButtons();
        }
    }
    else if(actionValue.includes('Add Event')){
        const id = Math.floor(Math.random()*(999-100+1)+100).toString();
        const event = { id, start, end, title: 'Arian Taj Event', type: 'event' }
        currentSchedule.events.push(event);
        this.props.onSaveChanges(schedule);
        this.addExitButtons();
    }
  }
}

const mapStateToProps = (state: any) => {
  const { schedule, settings } = state;
  return { schedule, settings };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onSaveChanges: bindActionCreators(
        scheduleActions.onUpdateSchedule,
        dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSchedule);
