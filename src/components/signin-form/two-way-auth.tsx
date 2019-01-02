// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import * as myClasses from "../";

import { Classes, MPDButton, MPDFloatingInput, MPDIcon } from "src/mpd-library";

import { IFormProps, LoginState } from "../";

import { Text } from "@blueprintjs/core";

import "./styles.css";

export interface ITwoWayAuthProps extends IFormProps {
  onDidNotGetItClicked(event: React.FormEvent<HTMLElement>): void;
  onTryAnotherClicked?(event: React.FormEvent<HTMLElement>): void;
}

export const TwoWayAuth: React.SFC<ITwoWayAuthProps> = props => {
  const {
    error,
    loginState,
    inputProps,
    onActionClicked,
    onInputChange,
    title,
    subtitle,
    onDidNotGetItClicked,
    onTryAnotherClicked
  } = props;
  return (
    <div
      className={classNames(
        "signin-login-container",
        loginState === LoginState.EnteringUsername && Classes.ACTIVE,
        myClasses.loginStateClass(loginState)
      )}
    >
      <div
        className={classNames(
          "signin-form-header",
          loginState === LoginState.EnteringUsername && Classes.ACTIVE,
          myClasses.loginStateClass(loginState)
        )}
      >
        <div>
          <MPDIcon name="login-main-graphic" />
          <Text className="signin-title"> {title} </Text>
          <Text className="signin-sub-title"> {subtitle} </Text>
        </div>
      </div>
      <div
        className={classNames(
          "signin-form-content",
          loginState === LoginState.EnteringUsername && Classes.ACTIVE,
          error && error.length > 0 && "error-" + Classes.ACTIVE,
          myClasses.loginStateClass(loginState)
        )}
      >
        <div className="signin-floating-input-container">
          <MPDFloatingInput
            focus={
              window.innerWidth > 480 && loginState === LoginState.TwoWayAuth
            }
            type="text"
            autoCapitalize="none"
            autoCorrect="none"
            onChange={onInputChange}
            tabIndex={loginState === LoginState.TwoWayAuth ? 1 : -1}
            required={true}
            {...inputProps}
          />
          <MPDFloatingInput
            type="text"
            autoCapitalize="none"
            autoCorrect="none"
            onChange={onInputChange}
            tabIndex={loginState === LoginState.TwoWayAuth ? 1 : -1}
            required={true}
            {...inputProps}
          />
          <MPDFloatingInput
            type="text"
            autoCapitalize="none"
            autoCorrect="none"
            onChange={onInputChange}
            tabIndex={loginState === LoginState.TwoWayAuth ? 1 : -1}
            required={true}
            {...inputProps}
          />
          <MPDFloatingInput
            type="text"
            autoCapitalize="none"
            autoCorrect="none"
            onChange={onInputChange}
            tabIndex={loginState === LoginState.TwoWayAuth ? 1 : -1}
            required={true}
            {...inputProps}
          />
        </div>
        <Text> {error} </Text>
        <div>
          <MPDButton text="Didn't Get it?" onClick={onDidNotGetItClicked} />
          <MPDButton text="Try another option" onClick={onTryAnotherClicked} />
        </div>
        <MPDButton onClick={onActionClicked} text="LOGIN" />
      </div>
    </div>
  );
};
