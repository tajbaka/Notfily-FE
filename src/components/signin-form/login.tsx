// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import * as myClasses from "../";

import { Classes, MPDButton, MPDFloatingInput, MPDIcon } from "src/mpd-library";

import { LoginState } from "../";

import { HTMLInputProps, Text } from "@blueprintjs/core";

import "./styles.css";

export interface IFormProps {
  error?: string;
  inputProps?: HTMLInputProps;
  loginState?: LoginState;
  loading?: boolean;
  title?: string;
  subtitle?: string;
  onBackClicked?(event: React.FormEvent<HTMLElement>): void;
  onCreateAccountClicked?(event: React.FormEvent<HTMLElement>): void;
  onActionClicked?(event: React.FormEvent<HTMLElement>): void;
  onInputChange?(event: React.FormEvent<HTMLElement>): void;
}

export const Login: React.SFC<IFormProps> = props => {
  const {
    error,
    loginState,
    onCreateAccountClicked,
    inputProps,
    onActionClicked,
    onInputChange,
    title,
    loading
  } = props;
  return (
    <div
      className={classNames(
        "signin-login-container",
        loginState === LoginState.EnteringUsername && Classes.ACTIVE,
        myClasses.loginStateClass(loginState),
        Classes.loadingStateClass(loading)
      )}
      tabIndex={-1}
    >
      <div
        className={classNames(
          "signin-form-header",
          loginState === LoginState.EnteringUsername && Classes.ACTIVE,
          myClasses.loginStateClass(loginState)
        )}
        tabIndex={-1}
      >
        <div className="signin-form-header-top" tabIndex={-1}>
          <MPDIcon className={'signin-logo'} name="notifly-logo" />
          <Text className="signin-title"> {title} </Text>
        </div>
      </div>
      <form
        className={classNames(
          "signin-form-content",
          loginState === LoginState.EnteringUsername && Classes.ACTIVE,
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
            loginState === LoginState.EnteringUsername
          }
          type="text"
          autoCapitalize="none"
          autoCorrect="none"
          onChange={onInputChange}
          tabIndex={loginState === LoginState.EnteringUsername ? 1 : -1}
          {...inputProps}
        />
        <div className={'login-bottom-text-container'}>
          <Text
              className={classNames(
                "signin-error",
                error && error.length > 0 && Classes.ACTIVE
              )}
            >
              {error}
          </Text>
          <div className={'login-create-account-button'} onClick={onCreateAccountClicked}>
            CREATE ACCOUNT
          </div>
        </div>
        <MPDButton
          className="signin-actions-button"
          type="submit"
          text="NEXT"
          disabled={loading}
          tabIndex={-1}
        />
      </form>
    </div>
  );
};
