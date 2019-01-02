// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { GroupsListItem, IGroupsListItemProps, StyledSelect } from 'src/components';

import { Classes } from 'src/mpd-library';

import "./styles.css";

export interface ISettingsGroupsListItemProps extends IGroupsListItemProps {
  active?: boolean;
  status?: string;
  statusOptions?: Array<string>;
  onStatusChanged?:(event: any) => void;
  onClick?:(event: any) => void;
}

export const SettingsGroupsListItem: React.SFC<ISettingsGroupsListItemProps> = props => {
    const { className, statusOptions, active, status, onStatusChanged, onClick, ...groupslistItemProps } = props;
    const classes = 'settings-groups-list-item';
    return (
      <div className={classNames(classes + '-container', active && Classes.ACTIVE, className)} onClick={onClick}>
        <GroupsListItem {...groupslistItemProps } />
        <div className='settings-select-wrapper' onClick={e => e.stopPropagation()}>
          <StyledSelect className="no-line-blue" value={status} options={statusOptions} onChange={ onStatusChanged} />
        </div>
      </div>
    );
}

export default SettingsGroupsListItem;
