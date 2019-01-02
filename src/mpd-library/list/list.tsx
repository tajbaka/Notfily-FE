import * as classNames from "classnames";
import * as React from "react";

import { IMPDListEmptyProps, MPDListEmpty } from './list-empty';

import {  Classes, filterArrByProperty, sortArrayByProperty, sortByMultipleProperties } from '../';

import { IMPDListFullProps, MPDListFull } from './list-full';

import './styles.css';

export interface IMPDFilterType {
  keys?: Array<string>;
  value?: string;
}

export interface IMPDListProps extends IMPDListEmptyProps, IMPDListFullProps {
  filter?: string | IMPDFilterType;
  loading?: boolean;
  maximumRendered?: number;
  sort?: string | Array<string>;
}

interface IMPDListState {
  currentListPos: number;
  list: Array<any>;
}

export const MPDList = <P extends object>(Component: React.ComponentType<any>) => {
  return class extends React.Component<IMPDListProps, IMPDListState> {
    public constructor(props: IMPDListProps) {
      super(props);
      this.onScrollBottom = this.onScrollBottom.bind(this);
      this.onIntializeList = this.onIntializeList.bind(this);
      const list = this.onIntializeList(this.props);
      this.state = {
        list,
        currentListPos: this.props.maximumRendered || 0
      }
    }

    public render() {
      const { className, emptyElement, list, loading, hiddenScrollProps, ...props } = this.props as IMPDListProps;
      const classes = classNames('mpd-list-container', loading && Classes.LOADING,  className);
      if(list === undefined || list.length === 0){
        return (
          <React.Fragment>
            {emptyElement ?
              <div className={classNames(classes, Classes.EMPTY)}>
                <MPDListEmpty emptyElement={emptyElement} />
              </div>
              : 
              null
            }
          </React.Fragment>
        );
      }
      return <MPDListFull className={classes} onScrollBottom={this.onScrollBottom} Component={Component} list={this.state.list} hiddenScrollProps={hiddenScrollProps} {...props} />
    }

    private onIntializeList(ref: any) {
      const { filter, maximumRendered, sort } =  ref;
      let { list } = ref;
      if(list && filter){
        if(filter.length > 0){
          list = filterArrByProperty(list, filter);
        }
        else if(filter.value){
          list = filterArrByProperty(list, filter.value, filter.keys);
        }
      }
      if(list && sort) {
        if(sort.constructor === Array){
          list = list.sort(sortByMultipleProperties(sort as Array<string>));
        }
        else {
          list = list.sort(sortArrayByProperty(sort as string));
        }
      }
      if(list && maximumRendered) {
        list = this.props.list.slice(0, maximumRendered);
      }
      return list;
    }

    private onScrollBottom(event: any) {
      const { maximumRendered, onScrollBottom } = this.props;
      let { currentListPos } = this.state;
      if(maximumRendered && this.state.list.length >= currentListPos){
        currentListPos = currentListPos + maximumRendered;
        const list = this.props.list.slice(0, currentListPos);
        this.setState({ currentListPos, list });
      }
      if(onScrollBottom){
        onScrollBottom(event);
      }
    }
  }
};