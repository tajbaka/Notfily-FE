import * as classNames from "classnames";
import * as React from "react";
import * as myClasses from "../";

import { IProps, Text } from "@blueprintjs/core";

import { StepperNode } from "../";

import { Classes, MPDButton } from "src/mpd-library";

import "./styles.css";

export interface IStepperProps extends IProps {
  data: Array<StepperNode>;
  loading: boolean;
  type?: string;
  onItemClick?(event: React.ChangeEvent<HTMLDivElement>, index: number): void;
}

export class Stepper extends React.Component<IStepperProps, {}> {
  constructor(props: IStepperProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public render() {
    const { className, loading, type, data } = this.props;
    const classes = classNames(myClasses.STEPPER_CONTAINER, type, className);
    return (
      <div className={classes}>
        <div
          className={classNames("stepper-loader", loading && Classes.ACTIVE)}
        >
          <div className="loader" />
        </div>
        <div
          className={classNames("inner-container", loading && Classes.LOADING)}
        >
          {data &&
            data.map((element: StepperNode, index: number) => (
              <div
                className={classNames(
                  myClasses.STEPPER_ITEM,
                  myClasses.stepperStatesClass(element.state)
                )}
                key={index}
              >
                <div
                  className={myClasses.STEPPER_ITEM_CONTAINER}
                  onClick={this.onClick}
                  data-id={index}
                >
                  <MPDButton
                    className={myClasses.STEPPER_ITEM_NUMBER}
                    text={element.num}
                    name="compose-success-icon"
                  />
                  <Text className={myClasses.STEPPER_ITEM_TEXT}>
                    {element.title}
                  </Text>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    );
  }

  private onClick(event: any) {
    const { onItemClick } = this.props;
    const index = parseInt(event.currentTarget.dataset.id, 10);
    if (onItemClick) {
      onItemClick(event, index);
    }
  }
}
