// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import * as myClasses from "../";

import { Classes, MPDButton, MPDFloatingInput, MPDIcon } from "src/mpd-library";

import { IFormProps, LoginState } from "../";

import { Text } from "@blueprintjs/core";

import "./styles.css";

export const ForgotPassword: React.SFC<IFormProps> = props => {
  const {
    error,
    inputProps,
    loginState,
    onBackClicked,
    onActionClicked,
    onInputChange,
    title,
    subtitle,
    loading
  } = props;
  return (
    <div
      className={classNames(
        "signin-forgotpassword-container",
        loginState === LoginState.EnteringForgotPassword && Classes.ACTIVE,
        myClasses.loginStateClass(loginState),
        Classes.loadingStateClass(loading)
      )}
      tabIndex={-1}
    >
      <div
        className={classNames(
          "signin-form-header",
          loginState === LoginState.EnteringForgotPassword && Classes.ACTIVE
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
          loginState === LoginState.EnteringForgotPassword && Classes.ACTIVE,
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
            loginState === LoginState.EnteringForgotPassword
          }
          type="text"
          autoCapitalize="none"
          autoCorrect="none"
          onChange={onInputChange}
          tabIndex={loginState === LoginState.EnteringForgotPassword ? 1 : -1}
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
        <MPDButton
          className="signin-actions-button"
          onClick={onActionClicked}
          text="send reset instructions"
          disabled={loading}
          tabIndex={-1}
        />
      </form>
    </div>
  );
};
