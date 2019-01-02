// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import * as myClasses from "../";

import { Classes, MPDButton, MPDFloatingInput, MPDIcon } from "src/mpd-library";

import { LoginState } from "../";

import { HTMLInputProps, Text } from "@blueprintjs/core";

import "./styles.css";

export interface ICreateAccountProps {
  passwordError?: string;
  error?: string;
  usernameProps?: HTMLInputProps;
  passwordProps?: HTMLInputProps;
  loginState?: LoginState;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  onBackClicked?(event: React.FormEvent<HTMLElement>): void;
  onActionClicked?(event: React.FormEvent<HTMLElement>): void;
  onUsernameChange?(event: React.FormEvent<HTMLElement>): void;
  onPasswordChange?(event: React.FormEvent<HTMLElement>): void;
}

export const CreateAccount: React.SFC<ICreateAccountProps> = props => {
  const {
    error,
    loginState,
    onActionClicked,
    onBackClicked,
    onPasswordChange,
    onUsernameChange,
    title,
    loading,
    passwordError,
    usernameProps,
    passwordProps
  } = props;
  return (
    <div
      className={classNames(
        "signin-create-account-container",
        loginState === LoginState.CreateAccount && Classes.ACTIVE,
        myClasses.loginStateClass(loginState),
        Classes.loadingStateClass(loading)
      )}
      tabIndex={-1}
    >
      <div
        className={classNames(
          "signin-form-header",
          loginState === LoginState.CreateAccount && Classes.ACTIVE,
          myClasses.loginStateClass(loginState)
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
          <MPDIcon className={'signin-logo'} name="notifly-logo" />
          <Text className="signin-title"> {title} </Text>
        </div>
      </div>
      <form
        className={classNames(
          "signin-form-content",
          loginState === LoginState.CreateAccount && Classes.ACTIVE,
          error && error.length > 0 && "error-" + Classes.ACTIVE,
          passwordError && passwordError.length > 0 && "error-" + Classes.ACTIVE,
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
            loginState === LoginState.CreateAccount
          }
          type="text"
          autoCapitalize="none"
          autoCorrect="none"
          onChange={onUsernameChange}
          tabIndex={loginState === LoginState.CreateAccount ? 1 : -1}
          {...usernameProps}
        />
        <MPDFloatingInput
          className={classNames(passwordError && passwordError.length > 0 && "error-" + Classes.ACTIVE)}
          type="text"
          autoCapitalize="none"
          autoCorrect="none"
          onChange={onPasswordChange}
          tabIndex={2}
          {...passwordProps}
        />
        <div className={'login-bottom-text-container'}>
          <Text
              className={classNames(
                "signin-error",
                error && error.length > 0 && "error-" + Classes.ACTIVE,
                passwordError && passwordError.length > 0 && "error-" + Classes.ACTIVE,
              )}
            >
              {error || passwordError}
          </Text>
        </div>
        <MPDButton
          className="signin-actions-button"
          type="submit"
          text="Create"
          disabled={loading}
          tabIndex={3}
        />
      </form>
    </div>
  );
};
