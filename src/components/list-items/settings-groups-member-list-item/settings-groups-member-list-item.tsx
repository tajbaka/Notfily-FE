// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IStyledButtonProps, StyledCheckbox, StyledSelect } from 'src/components';

import { IProps } from "@blueprintjs/core";

import { Classes } from 'src/mpd-library';

import "./styles.css";

export interface ISettingsGroupsMemberListItemProps extends IProps {
  active?: boolean;
  checkBoxProps?: IStyledButtonProps;
  title?: string;
  initials?: string;
  status?: string;
  statusOptions?: Array<string>;
  onStatusChanged?:(event: any) => void;
}

export const SettingsGroupsMemberListItem: React.SFC<ISettingsGroupsMemberListItemProps> = props => {
    const { className, active, checkBoxProps, title, initials, status, statusOptions, onStatusChanged } = props;
    const classes = 'settings-groups-member-list-item';
    return (
      <div className={classNames(classes + '-container', active && Classes.ACTIVE, className)}>
        <StyledCheckbox 
          labelElement={
            <div className={classes + '-checkbox-label-container'}> 
              <div className={classes + '-label-initials'}> {initials} </div> 
              <div className={classes + '-label-title'}> {title} </div> 
            </div>
          }
          {...checkBoxProps as any} 
        />
        <div className='settings-select-wrapper'>
          <StyledSelect className="no-line-blue" value={status} options={statusOptions} onChange={onStatusChanged} />
        </div>
      </div>
    );
}

export default SettingsGroupsMemberListItem;
