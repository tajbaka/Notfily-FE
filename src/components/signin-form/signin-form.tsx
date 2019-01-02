import * as classNames from "classnames";
import * as React from "react";
import * as Classes from "../";

import {
  CreateAccount,
  ForgotPassword,
  ICreateAccountProps,
  IFormProps,
  IPasswordProps,
  ITwoWayAuthProps,
  Login,
  LoginState,
  Password,
  ThankYou
} from "../";

import { HTMLDivProps } from "@blueprintjs/core";

import { MPDButton, MPDHiddenScrollContainer, MPDIcon } from "src/mpd-library";

import "./styles.css";

export interface IMPDSignInFormProps extends HTMLDivProps {
  logoName?: string;
  links?: Array<string>;
  passwordError?: string;
  error?: string;
  loading?: boolean;
  loginProps?: IFormProps;
  createAccountProps?: ICreateAccountProps;
  loginState?: LoginState;
  passwordProps?: IPasswordProps;
  forgotPasswordProps?: IFormProps;
  thankYouProps?: IFormProps;
  twoWayAuth?: ITwoWayAuthProps;
  onBackClicked?(event: React.FormEvent<HTMLElement>): void;
}

export class SignInForm extends React.Component<IMPDSignInFormProps> {
  constructor(props: IMPDSignInFormProps) {
    super(props);
  }

  public render() {
    const {
      className,
      createAccountProps,
      links,
      logoName,
      loginState,
      error,
      passwordError,
      loading,
      loginProps,
      passwordProps,
      forgotPasswordProps,
      onBackClicked,
      thankYouProps
    } = this.props;
    const classes = classNames(Classes.SIGNIN, className);

    return (
      <div className={classes} tabIndex={-1}>
        <img className={Classes.SIGNIN_BACKGROUND} tabIndex={-1} />
        <MPDHiddenScrollContainer
          className={Classes.SIGNIN_WRAPPER}
          tabIndex={-1}
          yDirection={true}
        >
          <div className={Classes.SIGNIN_HEADER} tabIndex={-1}>
            <MPDButton
              className={classNames(
                "signin-form-back",
                Classes.loginStateClass(loginState)
              )}
              onClick={onBackClicked}
              name="back-icon-white"
              text="Back"
              tabIndex={-1}
            />
            <MPDIcon className='signin-top-logo' name={logoName} tabIndex={-1} />
          </div>
          <div className={Classes.SIGNIN_FORM_CONTAINER_OUTER} tabIndex={-1}>
            <div className={Classes.SIGNIN_FORM_CONTAINER_INNER} tabIndex={-1}>
              <Login
                error={error}
                loading={loading}
                loginState={loginState}
                {...loginProps}
              />
               <CreateAccount
                error={error}
                passwordError={passwordError}
                loading={loading}
                loginState={loginState}
                {...createAccountProps}
              />
              <Password
                error={error}
                loading={loading}
                loginState={loginState}
                {...passwordProps}
              />
              <ForgotPassword
                error={error}
                loading={loading}
                loginState={loginState}
                {...forgotPasswordProps}
              />
              <ThankYou loginState={loginState} {...thankYouProps} />
            </div>
          </div>
          <div className={Classes.SIGNIN_FOOTER} tabIndex={-1}>
            {links &&
              links.map((link, index) => (
                <a href={link} tabIndex={-1} key={index}>
                  {link.toUpperCase()}
                </a>
              ))}
          </div>
        </MPDHiddenScrollContainer>
      </div>
    );
  }
}
