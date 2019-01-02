// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import { Classes } from 'src/mpd-library';

import "./styles.css";

export interface ISettingsItemsProps extends IProps{
  activeIndex?: number;
  title?: string;
  items: Array<string>;
  onItemClick(item?: string): void;
}

export const SettingsItems: React.SFC<ISettingsItemsProps> = props => {
  const { activeIndex, className, items, onItemClick, title } = props;
  return (
      <div className={classNames('settings-items-container', className)}>
          <Text className='settings-items-heading'> {title} </Text>
          {items.map((item: string, index: number) => (
              <div className={classNames('settings-items-inner-container', activeIndex === index && Classes.ACTIVE)} key={index}>
                <hr />
                <div className='settings-item' onClick={e => onItemClick(item.toLocaleLowerCase())}> {item} </div>
              </div>
          ))}
      </div>
  );
}

export default SettingsItems;
