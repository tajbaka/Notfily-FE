import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import { StyledButton, StyledInput } from 'src/components';

import { Icon } from 'src/library';

import "./styles.css";

export interface ISignInFormProps extends IProps {
    error?: string;
    onChangePassword?: (event: any) => void;
    onChangeUsername?: (event: any) => void;
    onCreateAccount?: (event: any) => void;
    onForgotPassword?: (event: any) => void;
    onSignIn?: (event: any) => void;
}

export const SignInForm: React.SFC<ISignInFormProps> = props => {
  const { className, error, onCreateAccount, onChangePassword, onChangeUsername, onSignIn } = props;
  const classes = 'signin-form';

  return (
    <div className={classNames(classes, className)}>
        <div className={classes + '-header'}>
            <Icon className={classes + '-logo'} name='notifly-logo' />
            <Text className={classes + '-title'}> Sign In </Text>
        </div>
        <form className={classes + '-form'}>
            <StyledInput className={classes + '-styled-input'} placeholder='Email' onChange={onChangeUsername} />
            <StyledInput className={classes + '-styled-input'} placeholder='Password' type='password' onChange={onChangePassword}  />
            <Text className={classes + '-error'}> { error } </Text>
            {/* <StyledButton
                className={classes + '-forgot-password'}
                text='Forgot Password?'
                onClick={onForgotPassword}
            /> */}
        </form>
        <div className={classes + '-action-container'}>
            <StyledButton
                className={classes + '-create-account'}
                text='Create Account'
                onClick={onCreateAccount}
            />
            <StyledButton
                type={'primary-color'}
                className={classes + '-sign-in'}
                text='Sign In'
                onClick={onSignIn}
            />
        </div>
    </div>
  );
};
