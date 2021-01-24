import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { authActions } from "../../actions";

interface ISignOutProps {
  auth: any;
  routeProps: any;
  logoutAction: (authString?: string) => (dispatch: Dispatch<any>) => Promise<void>;
}

export class SignOut extends React.Component<ISignOutProps> {
  constructor(props: ISignOutProps) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  public componentWillMount() {
    this.logoutUser();
    const { routeProps } = this.props;
    if (routeProps) {
      routeProps.history.replace("/signin");
    }
  }

  public render() {
    return <div />;
  }

  private logoutUser() {
    if (this.props.logoutAction) {
      this.props.logoutAction('adminAuth');
    }
  }
}

const mapStateToProps = (state: any) => {
  const { auth } = state;
  return {
    auth
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    logoutAction: bindActionCreators(authActions.logoutAction, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
