import * as React from "react";

import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { authActions } from 'src/actions';

import { LoginState, SignInForm } from "../../components";

import "./styles.css";

interface ISignInProps {
  onLoginAction: (
    email: string,
    password: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onLoginStateAction: (
    loginState: LoginState
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onNextAction: (email?: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onCreateAction: (email: string, password: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onResetAction: (email: string) => (dispatch: Dispatch<any>) => Promise<void>;
  onForgotPasswordChanged: (
    text: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onCreateAccountUsernameChanged: (
    text: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onCreateAccountPasswordChanged: (
    text: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onUsernameChanged: (
    text: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  onPasswordChanged: (
    text: string
  ) => (dispatch: Dispatch<any>) => Promise<void>;
  error?: string;
  passwordError?: string;
  routeProps: any;
  loading?: boolean;
  loginState?: LoginState;
  authenticated: boolean;
  forgotPasswordValue: string;
  passwordValue?: string;
  usernameValue?: string;
  createAccountUsernameValue?: string;
  createAccountPasswordValue?: string;
}

interface ISignInState {
  links?: Array<string>;
  redirectUrl: string;
}

export class SignIn extends React.Component<ISignInProps, ISignInState> {
  constructor(props: ISignInProps) {
    super(props);
    this.onNextClick = this.onNextClick.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onResetClick = this.onResetClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onForgotPasswordClick = this.onForgotPasswordClick.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onForgotPasswordChange = this.onForgotPasswordChange.bind(this);
    this.onCreateAccountClick = this.onCreateAccountClick.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
    this.onCreateAccountPasswordChange = this.onCreateAccountPasswordChange.bind(this);
    this.onCreateAccountUsernameChange = this.onCreateAccountUsernameChange.bind(this);

    let redirectUrl;
    let locationState;
    const { routeProps } = this.props;

    if (routeProps) {
      locationState = routeProps.history.location.state;
    }

    if (locationState === undefined) {
      redirectUrl = "schedule";
    } else {
      redirectUrl = locationState.from.pathname;
    }

    this.state = {
      links: ["home", "about"],
      redirectUrl
    };
  }

  public componentWillReceiveProps({
    authenticated,
    loginState
  }: ISignInProps) {
    const { redirectUrl } = this.state;
    const { routeProps } = this.props;
    if (
      authenticated &&
      authenticated !== this.props.authenticated &&
      routeProps
    ) {
      routeProps.history.push(redirectUrl);
    }
  }

  public render() {
    const {
      createAccountUsernameValue,
      createAccountPasswordValue,
      error,
      passwordError,
      loading,
      loginState,
      forgotPasswordValue,
      passwordValue,
      usernameValue
    } = this.props;
    const { links } = this.state;

    return (
      <SignInForm
        error={error}
        passwordError={passwordError}
        loading={loading}
        loginState={loginState}
        logoName="notifly-logo-2-white"
        links={links}
        onBackClicked={this.onBackClick}
        loginProps={{
          inputProps: { placeholder: "Username", value: usernameValue },
          onActionClicked: this.onNextClick,
          onInputChange: this.onUsernameChange,
          onBackClicked: this.onBackClick,
          onCreateAccountClicked: this.onCreateAccountClick,
          title: "Sign In"
        }}
        createAccountProps={{
          usernameProps: { placeholder: "Username", value: createAccountUsernameValue },
          passwordProps: { placeholder: "Password", value: createAccountPasswordValue },
          onActionClicked: this.onCreateClick,
          onUsernameChange: this.onCreateAccountUsernameChange,
          onPasswordChange: this.onCreateAccountPasswordChange,
          onBackClicked: this.onBackClick,
          title: "Create Account"
        }}
        passwordProps={{
          inputProps: { placeholder: "Password", value: passwordValue },
          userName: usernameValue,
          checkBoxProps: { label: "Remember Me" },
          onActionClicked: this.onLoginClick,
          onInputChange: this.onPasswordChange,
          onForgotPasswordClicked: this.onForgotPasswordClick,
          onBackClicked: this.onBackClick,
          title: "Hi Jason",
          subtitle: `Enter your password below to login`
        }}
        forgotPasswordProps={{
          inputProps: { placeholder: "Username", value: forgotPasswordValue },
          onActionClicked: this.onResetClick,
          onInputChange: this.onForgotPasswordChange,
          onBackClicked: this.onBackClick,
          title: "Forgot Password?",
          subtitle: `Enter your username and we'll send you a new password`
        }}
        thankYouProps={{
          title: "Email Sent",
          subtitle: "Check your email and click on the reset link",
          onBackClicked: this.onBackClick
        }}
      />
    );
  }

  private onCreateAccountClick() {
    this.props.onLoginStateAction(LoginState.CreateAccount);
  }

  private onForgotPasswordClick() {
    this.props.onLoginStateAction(LoginState.EnteringForgotPassword);
  }

  private onBackClick(event: any) {
    const { loginState } = this.props;
    switch (loginState) {
      case LoginState.EnteringPassword:
        this.props.onLoginStateAction(LoginState.EnteringUsername);
        break;
      case LoginState.CreateAccount:
        this.props.onLoginStateAction(LoginState.EnteringUsername);
        break;
      case LoginState.EnteringForgotPassword:
        this.props.onLoginStateAction(LoginState.EnteringPassword);
        break;
      case LoginState.ThankYou:
        this.props.onLoginStateAction(LoginState.EnteringForgotPassword);
      default:
        break;
    }
  }

  private onUsernameChange(event: any) {
    this.props.onUsernameChanged(event.target.value);
  }

  private onCreateAccountUsernameChange(event: any) {
    this.props.onCreateAccountUsernameChanged(event.target.value);
  }

  private onCreateAccountPasswordChange(event: any) {
    this.props.onCreateAccountPasswordChanged(event.target.value);
  }

  private onPasswordChange(event: any) {
    this.props.onPasswordChanged(event.target.value);
  }

  private onForgotPasswordChange(event: any) {
    this.props.onForgotPasswordChanged(event.target.value);
  }

  private onLoginClick(event: any) {
    const { passwordValue, usernameValue } = this.props;
    if (usernameValue !== undefined && passwordValue !== undefined) {
      this.props.onLoginAction(usernameValue, passwordValue);
    }
  }

  private onCreateClick(event: any) {
    const { createAccountUsernameValue, createAccountPasswordValue } = this.props;
    if (createAccountUsernameValue !== undefined && createAccountPasswordValue !== undefined) {
      this.props.onCreateAction(createAccountUsernameValue, createAccountPasswordValue);
    }
  }

  private onNextClick(event: any) {
    const { usernameValue } = this.props;
    if (usernameValue !== undefined) {
      this.props.onNextAction(usernameValue);
    }
  }

  private onResetClick(event: any) {
    const { forgotPasswordValue } = this.props;
    if (forgotPasswordValue !== undefined) {
      this.props.onResetAction(forgotPasswordValue);
    }
  }
}

const mapStateToProps = (state: any) => {
  const { auth } = state;
  const {
    authenticated,
    error,
    loading,
    loginState,
    forgotPasswordValue,
    createAccountPasswordValue,
    createAccountUsernameValue,
    passwordValue,
    passwordError,
    usernameValue
  } = auth;

  return {
    authenticated,
    createAccountPasswordValue,
    createAccountUsernameValue,
    forgotPasswordValue,
    loading,
    loginState,
    error,
    passwordError,
    passwordValue,
    usernameValue
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onLoginStateAction: bindActionCreators(authActions.onLoginStateAction, dispatch),
    onLoginAction: bindActionCreators(authActions.onLoginAction, dispatch),
    onNextAction: bindActionCreators(authActions.onNextAction, dispatch),
    onCreateAction: bindActionCreators(authActions.onCreateAction, dispatch),
    onResetAction: bindActionCreators(authActions.onResetAction, dispatch),
    onCreateAccountUsernameChanged: bindActionCreators(authActions.onCreateAccountUsernameChanged, dispatch),
    onCreateAccountPasswordChanged: bindActionCreators(authActions.onCreateAccountPasswordChanged, dispatch),
    onUsernameChanged: bindActionCreators(authActions.onUsernameChanged, dispatch),
    onPasswordChanged: bindActionCreators(authActions.onPasswordChanged, dispatch),
    onForgotPasswordChanged: bindActionCreators(
      authActions.onForgotPasswordChanged,
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
