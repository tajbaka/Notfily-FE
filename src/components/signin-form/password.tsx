// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import * as myClasses from "../";

import { Classes, MPDButton, MPDFloatingInput, MPDIcon } from "src/mpd-library";

import { IFormProps, LoginState } from "../";

import { Checkbox, ICheckboxProps, Text } from "@blueprintjs/core";

import "./styles.css";

export interface IPasswordProps extends IFormProps {
  userName?: string;
  checkBoxProps?: ICheckboxProps;
  onForgotPasswordClicked?(event: React.FormEvent<HTMLElement>): void;
}

export const Password: React.SFC<IPasswordProps> = props => {
  const {
    error,
    inputProps,
    loginState,
    checkBoxProps,
    onBackClicked,
    onActionClicked,
    onInputChange,
    onForgotPasswordClicked,
    title,
    subtitle,
    // userName,
    loading
  } = props;
  return (
    <div
      className={classNames(
        "signin-password-container",
        loginState === LoginState.EnteringPassword && Classes.ACTIVE,
        myClasses.loginStateClass(loginState),
        Classes.loadingStateClass(loading)
      )}
      tabIndex={-1}
    >
      <div
        className={classNames(
          "signin-form-header",
          loginState === LoginState.EnteringPassword && Classes.ACTIVE
        )}
        tabIndex={-1}
      >
        <MPDButton
          className="signin-form-back"
          name="back-icon-white"
          onClick={onBackClicked}
          text="Back"
          tabIndex={-1}
        />
        <div className="signin-form-header-top" tabIndex={-1}>
          <MPDIcon className={'signin-logo'} name="notifly-logo" tabIndex={-1} />
          <Text className="signin-title"> {title} </Text>
          <Text className="signin-subtitle"> {subtitle} </Text>
        </div>
      </div>
      <form
        className={classNames(
          "signin-form-content",
          loginState === LoginState.EnteringPassword && Classes.ACTIVE,
          error && error.length > 0 && "error-" + Classes.ACTIVE,
          myClasses.loginStateClass(loginState)
        )}
        onSubmit={e => {
          e.preventDefault();
          if (onActionClicked) {
            onActionClicked(e);
          }
        }}
        tabIndex={-1}
        noValidate={true}
      >
        <MPDFloatingInput
          className={classNames(error && error.length > 0 && "error-" + Classes.ACTIVE)}
          focus={
            window.innerWidth > 480 &&
            loginState === LoginState.EnteringPassword
          }
          type="password"
          autoCapitalize="none"
          autoCorrect="none"
          onChange={onInputChange}
          tabIndex={loginState === LoginState.EnteringPassword ? 1 : -1}
          required={true}
          {...inputProps}
        />
        <Text
          className={classNames(
            "signin-error",
            error && error.length > 0 && Classes.ACTIVE
          )}
        >
          {error}
        </Text>
        <div
          className={classNames(
            "signin-form-content-bottom",
            loginState === LoginState.EnteringPassword && Classes.ACTIVE
          )}
          tabIndex={-1}
        >
          <Checkbox {...checkBoxProps} tabIndex={-1} />
          <MPDButton
            text="Forgot Password?"
            tabIndex={-1}
            onClick={onForgotPasswordClicked}
          />
        </div>
        <MPDButton
          className="signin-actions-button"
          onClick={onActionClicked}
          text="Login"
          tabIndex={-1}
        />
      </form>
    </div>
  );
};
