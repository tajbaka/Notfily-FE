import * as classNames from "classnames";
import * as React from "react";
// import * as myClasses from "../";

import { StyledAlert, StyledInput } from 'src/components';

import { language } from '../../../';

import { IProps, Text } from "@blueprintjs/core";

import "./styles.css";

export interface IAdminScheduleAlertsProps extends IProps {
  settings: any; 
  showAlert: boolean;
  actionPressed?: string;
  selectedEvent: any;
  onAlertCancel?:(event: any) => void;
  onAlertConfirm?:(event: any) => void;
  onAlertInputChanged?:(event: any) => void;
}

export const AdminScheduleAlerts: React.SFC<IAdminScheduleAlertsProps> = props => {
  const {
    showAlert,
    actionPressed,
    onAlertCancel,
    onAlertConfirm,
    selectedEvent,
    settings,
    onAlertInputChanged,
    className,
  } = props;

  const classes = classNames("admin-schedule-alerts", className);

  return (
    <React.Fragment>
        {actionPressed === 'clicked' && selectedEvent &&
            <StyledAlert
                className={classNames("generic-alert", classes)}
                confirmButtonText={language[settings.language].ok}
                cancelButtonText={language[settings.language].cancel}
                isOpen={showAlert}
                canEscapeKeyCancel={true}
                canOutsideClickCancel={true}
                onCancel={onAlertCancel}
                onConfirm={onAlertConfirm}
            >
            <div className={classes + '-inner-container'}>
                <Text className={classes + '-title'}> {language[settings.language].alertDetails} </Text>
                <div className={classes + '-details-container'}>
                    <div className={classes + '-details-labels'}>
                        <Text className={classes + '-label'}> {language[settings.language].title} </Text>
                        <Text className={classes + '-label'}> {language[settings.language].time} </Text>
                        {selectedEvent.phoneNumber &&
                            <Text className={classes + '-label'}> {language[settings.language].phone} </Text>
                        }
                        {selectedEvent.email &&
                            <Text className={classes + '-label'}> {language[settings.language].email} </Text>
                        }
                    </div>
                    <div className={classes + '-details'}>
                        <div className={classes + '-detail'}>
                            <StyledInput
                                className={classes + '-input'}
                                inputType='floating'
                                autoCapitalize="none"
                                autoCorrect="none"
                                maxCounter={50}
                                floatingType="settings"
                                value={selectedEvent.title}
                                onChange={onAlertInputChanged}
                                placeholder=""
                                tabIndex={1}
                            />
                        </div>
                        <Text className={classes + '-detail'}> { selectedEvent.time } </Text>
                        {console.log(selectedEvent)}
                        {selectedEvent.phoneNumber &&
                            <Text className={classes + '-detail'}> { selectedEvent.phoneNumber } </Text>
                        }
                        {selectedEvent.email &&
                            <Text className={classes + '-detail'}> { selectedEvent.email } </Text>
                        }
                    </div>
                </div>
            </div>
            </StyledAlert>
                }
                {actionPressed === 'exit' && selectedEvent &&
                    <StyledAlert
                        className={classNames("generic-alert", classes + '')}
                        cancelButtonText={language[settings.language].no}
                        confirmButtonText={language[settings.language].yes}
                        isOpen={showAlert}
                        canEscapeKeyCancel={true}
                        canOutsideClickCancel={true}
                        onCancel={onAlertCancel}
                        onConfirm={onAlertConfirm}
                    >   
                        <div className={classes + '-inner-container'}>
                            <Text className={classes + '-title'}> {language[settings.language].deletePrompt} </Text>
                        </div>
                    </StyledAlert>
                }
                {actionPressed === 'new' && selectedEvent &&
                    <StyledAlert
                        className={classNames("generic-alert", classes + '')}
                        cancelButtonText={language[settings.language].cancel}
                        confirmButtonText={language[settings.language].confirm}
                        isOpen={showAlert}
                        canEscapeKeyCancel={true}
                        canOutsideClickCancel={true}
                        onCancel={onAlertCancel}
                        onConfirm={onAlertConfirm}
                    >   
                        <div className={classes + '-inner-container'}>
                            <Text className={classes + '-title'}> {language[settings.language].event} </Text>
                            <Text className={classes + '-input-label'}> {language[settings.language].eventTitle}  </Text>
                            <div className={classes + '-input-container'}>
                                <StyledInput
                                    className={classes + '-input'}
                                    inputType='floating'
                                    autoCapitalize="none"
                                    autoCorrect="none"
                                    maxCounter={50}
                                    floatingType="settings"
                                    value={selectedEvent.title}
                                    onChange={onAlertInputChanged}
                                    placeholder=""
                                    tabIndex={1}
                                />
                            </div>
                        </div>
                    </StyledAlert>
                }
    </React.Fragment>
  );
};
