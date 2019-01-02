import * as classNames from "classnames";
import * as React from "react";
import * as myClasses from "../";

import { ChannelBoxTypes } from "../";

import { Checkbox, HTMLDivProps, Text } from "@blueprintjs/core";

import { MPDButton, MPDIcon, MPDIOSSelectableDiv } from "src/mpd-library";

import "./styles.css";

interface IChannelBoxProps extends HTMLDivProps {
  name?: string;
  title?: string;
  jsxElement?: JSX.Element;
  description?: string;
  horizontalList?: Array<any>;
  list?: Array<any>;
  type?: ChannelBoxTypes;
  onItemClick?(event: any): void;
}

const defaultProps: IChannelBoxProps = {
  type: "default"
};

export const ChannelBox: React.SFC<IChannelBoxProps> = props => {
  const {
    className,
    name,
    title,
    description,
    type,
    id,
    onItemClick,
    horizontalList,
    list,
    jsxElement,
    ...newProps
  } = props;

  const classes = classNames(
    myClasses.CHANNEL_BOX,
    className,
    myClasses.channelStatesClass(type)
  );

  return (
    <MPDIOSSelectableDiv className={classes} data-id={id} {...newProps}>
      <div className={myClasses.CHANNEL_BOX_MAIN}>
        {name && (
          <MPDIcon
            className={myClasses.CHANNEL_BOX_CHECKMARK}
            name="compose-alert--channels--check"
          />
        )}
        {name && (
          <MPDIcon
            className={myClasses.CHANNEL_BOX_CHECKMARK + "-white"}
            name="compose-alert--channels--check-white"
          />
        )}
        {name && (
          <div className={myClasses.CHANNEL_BOX_ICONS_CONTAINER}>
            <MPDIcon className={myClasses.CHANNEL_BOX_ICON} name={name} />
            <MPDIcon
              className={myClasses.CHANNEL_BOX_ICON + "-active"}
              name={name + "-active"}
            />
          </div>
        )}
        <div className={myClasses.CHANNEL_BOX_INFO_CONTAINER}>
          {jsxElement === undefined ? (
            <div>
              <Text className={myClasses.CHANNEL_BOX_TITLE}>{title}</Text>
              <Text className={myClasses.CHANNEL_BOX_DESCRIPTION}>
                {description}
              </Text>
            </div>
          ) : (
            jsxElement
          )}
          <div className={myClasses.CHANNEL_BOX_INFO_BUTTONS}>
            {horizontalList &&
              horizontalList.map((element, index) => (
                <MPDButton
                  className={classNames(element.type)}
                  text={element.title}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={myClasses.CHANNEL_BOX_LIST}>
        {list &&
          list.map((element, index) => (
            <div
              className={classNames(
                myClasses.CHANNEL_BOX_LIST_ITEM,
                element[Object.keys(element)[0]].status && "mpd-active"
              )}
              key={index}
              onChange={onItemClick}
            >
              <Checkbox
                onChange={onItemClick}
                data-type={index}
                data-id={id}
                checked={element[Object.keys(element)[0]].status}
                label={[Object.keys(element)[0]].toString()}
              />
            </div>
          ))}
      </div>
    </MPDIOSSelectableDiv>
  );
};

ChannelBox.defaultProps = defaultProps;
