// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { Classes, IMPDSelectableItem } from "src/mpd-library";

import { Checkbox, ICheckboxProps, Text } from "@blueprintjs/core";

import "./styles.css";

export interface IGroupsListItemProps extends IMPDSelectableItem, ICheckboxProps {
  checked?: boolean;
  title?: string;
  description?: string;
  members?: Array<any>;
  type?: string;
  loading?: boolean;
  onCheckChanged?:(event: any) => void;
}

export class GroupsListItem extends React.Component<IGroupsListItemProps> {
  public render() {
    const { checked, onCheckChanged, title, description, members, type, className, loading, onItemClick } = this.props;
    const classes = classNames('groups-list-item-container', loading && Classes.LOADING, className);
    return (
      <div className={classes} onClick={onItemClick}>
        <Checkbox
            className={classNames(checked && Classes.ACTIVE)}
            checked={checked}
            label={title}
            onChange={onCheckChanged}
            onClick={e => e.stopPropagation()}
        />
        <Text className='group-list-item-description'> { description } </Text>
        <Text className={classNames('group-list-item-type', type)}> {type} </Text>
        {members &&
          <Text className='group-list-item-members'> { members && members.length } Members </Text>
        }
      </div>
    );
  }
}
