// tslint:disable jsx-no-lambda
import * as React from "react";
import { connect } from "react-redux";

import { Text } from "@blueprintjs/core";

import "./styles.css";

export interface IErrorProps {
  error: string;
  routeProps?: any;
}

export class Settings extends React.Component<IErrorProps> {

  constructor(props: IErrorProps) {
    super(props);
  }


  public render() {
    const classes = 'notifly-error';
    const { error } = this.props;
    return (
        <div className={classes}>
           <Text className={classes + '-title'}> { error ? error : 'Something went wrong' } </Text> 
        </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { adminSchedule } = state;
  const { error } = adminSchedule;
  return { error };
};

export default connect(mapStateToProps, {})(Settings);
