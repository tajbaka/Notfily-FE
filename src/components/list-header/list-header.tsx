// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { HTMLDivProps } from "@blueprintjs/core";

import { StyledSelect } from 'src/components';

import { Classes } from "src/mpd-library";

import "./styles.css";

export interface IListHeaderProps extends HTMLDivProps {
    placeholder?: string;
    searchValue?: string;
    middleElement?: JSX.Element;
    groupsSelectOptions?: Array<string>;
    groupsSortOptions?: Array<string>;
    onGroupsSelectChange?(event: any): void;
    onGroupsSortChange?(event: any): void;
    onSearchChange?(event: any): void;
}

export const ListHeader: React.SFC<IListHeaderProps> = props => {
    const { className, onGroupsSelectChange, groupsSelectOptions, groupsSortOptions, middleElement, onGroupsSortChange } = props;
    const classes = classNames(
        'list-header-container',
        className
    );
    return (
        <div className={classes}>
        <div className={Classes.LEFT}>
            <StyledSelect
                className="image-blue"
                options={groupsSelectOptions || ["All", "None"]}
                unSelectable={true}
                value=' '
                leftIcon={"list-rectangle"}
                onChange={onGroupsSelectChange}
            />
            <StyledSelect
                className="image-blue"
                options={groupsSortOptions || ["A-Z", "Private", "Public"]}
                unSelectable={true}
                value=' '
                leftIcon={"triple-line"}
                onChange={onGroupsSortChange}
            />
            { middleElement }
        </div>
        </div>
    );
}   
