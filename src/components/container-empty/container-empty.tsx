import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import { TestIcon } from "src/mpd-library/";

import './styles.css';

interface IContainerEmptyProps extends IProps {
  title?: string;
  subtitle?: string;
  iconName?: string;
}

export const ContainerEmpty: React.SFC<IContainerEmptyProps> = props => {
  const { className, iconName, title, subtitle } = props;
  const classes = classNames('container-empty', className);

  return (
    <div className={classes}>
      {iconName &&
      <TestIcon name={iconName} />
      }
      {title && 
        <Text className='title'>{title}</Text>
      }
      {subtitle &&
        <Text className='subtitle'>{subtitle}</Text>
      }
    </div>
  );
};

export default ContainerEmpty;
