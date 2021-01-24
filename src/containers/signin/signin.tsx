// tslint:disable
import * as classNames from "classnames";
import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { authActions } from 'src/actions';

import { IProps, Spinner } from "@blueprintjs/core";

import {Route, Switch } from "react-router-dom";

import { CreateAccountForm, SignInForm } from './components';

import "./styles.css";

interface ISignInProps extends IProps {
  authenticated: boolean;
  routeProps: any;
  loading?: boolean;
  forgotPasswordUsernameValue: string;
  createAccountError: string;
  createAccountPasswordValue: string;
  createAccountUsernameValue: string;
  signinError: string;
  signinPasswordValue: string;
  signinUsernameValue: string;
  onChangeSignInUsernameValue: (value: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onChangeSignInPasswordValue: (value: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onChangeCreateUsernameValue: (value: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onChangeCreatePasswordValue: (value: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onCreateAccount: (email: string, password: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onLoginAccount: (email: string, password: string) => (dispatch: Dispatch<any>) => Promise<void>;
}

interface ISignInState {
  test?: string;
}

export class SignIn extends React.Component<ISignInProps, ISignInState> {
  constructor(props: ISignInProps) {
    super(props);
    this.onChangeSignInPassword = this.onChangeSignInPassword.bind(this);
    this.onChangeSignInUsername = this.onChangeSignInUsername.bind(this);
    this.onCreateNavAccount = this.onCreateNavAccount.bind(this);
    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.onLoginAccount = this.onLoginAccount.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
    this.onChangeCreatePassword = this.onChangeCreatePassword.bind(this);
    this.onChangeCreateUsername = this.onChangeCreateUsername.bind(this);
  }

  public componentWillReceiveProps(nextProps: any) {
    const { authenticated, routeProps } = nextProps;
    if(this.props.authenticated !== authenticated && authenticated){
      routeProps.history.push('/schedule');
    }
  }

  public render() {
    const { className, createAccountError, signinError, loading } = this.props;
    const classes = 'signin';

    return (
      <div className={classNames(classes, className)}>
        {loading && <Spinner className={classes + '-spinner'} size={30} />}
        <Switch>
          <Route
            exact={true}
            render={() => <SignInForm 
              onCreateAccount={this.onCreateNavAccount}
              onSignIn={this.onLoginAccount}
              onForgotPassword={this.onForgotPassword}
              onChangeUsername={this.onChangeSignInUsername}
              onChangePassword={this.onChangeSignInPassword}
              error={signinError}
            />
            }
            path='/signin'
          />
          <Route
            exact={true}
            render={() => <CreateAccountForm
              onChangeUsername={this.onChangeCreateUsername}
              onChangePassword={this.onChangeCreatePassword}
              onCreateAccount={this.onCreateAccount}
              error={createAccountError}
            />
            }
            path='/signin/create-account'
          />
        </Switch>
      </div>
    );
  }

  private onChangeCreateUsername(event: any){
    const value = event.currentTarget.value;
    this.props.onChangeCreateUsernameValue(value);
  }

  private onChangeCreatePassword(event: any){
    const value = event.currentTarget.value;
    this.props.onChangeCreatePasswordValue(value);
  }

  private onChangeSignInUsername(event: any) {
    const value = event.currentTarget.value;
    this.props.onChangeSignInUsernameValue(value);
  }

  private onChangeSignInPassword(event: any) {
    const value = event.currentTarget.value;
    this.props.onChangeSignInPasswordValue(value);
  }

  private onForgotPassword(){
    const { routeProps } = this.props;
    routeProps.history.push('/signin/forgot-password');
  }

  private onLoginAccount(){
    const { signinPasswordValue, signinUsernameValue } = this.props;
    this.props.onLoginAccount(signinUsernameValue, signinPasswordValue);
  }

  private onCreateAccount() {
    const { createAccountUsernameValue, createAccountPasswordValue } = this.props;
    this.props.onCreateAccount(createAccountUsernameValue, createAccountPasswordValue);
  }

  private onCreateNavAccount() {
    const { routeProps } = this.props;
    routeProps.history.push('/signin/create-account');
  }
}

const mapStateToProps = (state: any) => {
  const { auth, global } = state;
  const { loading } = global;
  const {
    authenticated,
    forgotPasswordUsernameValue,
    createAccountError,
    createAccountPasswordValue,
    createAccountUsernameValue,
    signinError,
    signinPasswordValue,
    signinUsernameValue
  } = auth;

  return {
    authenticated,
    createAccountError,
    createAccountPasswordValue,
    createAccountUsernameValue,
    forgotPasswordUsernameValue,
    loading,
    signinError,
    signinPasswordValue,
    signinUsernameValue
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onChangeCreateUsernameValue: bindActionCreators(authActions.onCreateAccountUsernameChanged, dispatch),
    onChangeCreatePasswordValue: bindActionCreators(authActions.onCreateAccountPasswordChanged, dispatch),
    onChangeSignInPasswordValue: bindActionCreators(authActions.onPasswordChanged, dispatch),
    onChangeSignInUsernameValue: bindActionCreators(authActions.onUsernameChanged, dispatch),
    onLoginAccount: bindActionCreators(authActions.onLoginAction, dispatch),
    onCreateAccount: bindActionCreators(authActions.onCreateAdmin, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
