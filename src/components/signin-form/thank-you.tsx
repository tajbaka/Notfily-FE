// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import * as myClasses from "../";

import { Classes, MPDButton, TestIcon } from "src/mpd-library";

import { IFormProps, LoginState } from "../";

import { Text } from "@blueprintjs/core";

import "./styles.css";

export const ThankYou: React.SFC<IFormProps> = props => {
  const { loginState, onBackClicked, title, subtitle } = props;
  return (
    <div
      className={classNames(
        "signin-thankyou-container",
        loginState === LoginState.ThankYou && Classes.ACTIVE,
        myClasses.loginStateClass(loginState)
      )}
    >
      <div
        className={classNames(
          "signin-form-header",
          loginState === LoginState.ThankYou && Classes.ACTIVE
        )}
      >
        <MPDButton
          name="back-icon-white"
          className="signin-form-back"
          onClick={onBackClicked}
          text="Back"
        />
        <div
          className={classNames(
            "signin-thankyou-content",
            loginState === LoginState.ThankYou && Classes.ACTIVE
          )}
        >
          <TestIcon name="paper-airplane" />
          <Text className="signin-title"> {title} </Text>
          <Text className="signin-subtitle"> {subtitle} </Text>
        </div>
      </div>
    </div>
  );
};
