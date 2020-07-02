import * as classNames from "classnames";
import * as React from "react";

import { IProps, Text } from "@blueprintjs/core";

import { StyledButton, StyledInput } from 'src/components';

import { Icon } from 'src/library';

import "./styles.css";

export interface ICreateAccountFormProps extends IProps {
    error?: string;
    onChangePassword?: (event: any) => void;
    onChangeUsername?: (event: any) => void;
    onCreateAccount?: (event: any) => void;
}

export const CreateAccountForm: React.SFC<ICreateAccountFormProps> = props => {
  const { className, error, onChangePassword, onChangeUsername, onCreateAccount } = props;
  const classes = 'create-account-form';

  return (
    <div className={classNames(classes, className)}>
        <div className={classes + '-header'}> 
            <Icon className={classes + '-logo'} name='notifly-logo' />
            <Text className={classes + '-title'}> Create Account </Text>
        </div>
        <form className={classes + '-form'}>
            <StyledInput className={classes + '-styled-input'} onChange={onChangeUsername} placeholder='Email' />
            <StyledInput className={classes + '-styled-input'} onChange={onChangePassword} placeholder='Password' type='password' />
            <Text className={classes + '-error'}> { error } </Text>
        </form>
        <div className={classes + '-action-container'}>
            <StyledButton
                type={'primary-color'}
                className={classes + '-action'}
                text='Create Account'
                onClick={onCreateAccount}
            />
        </div>
    </div>
  );
};
