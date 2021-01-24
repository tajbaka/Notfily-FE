// tslint:disable
import { AdminSchedule, Settings, UserSchedule, Error } from "../containers";
import SignIn from "../containers/signin/signin";
import SignOut from "../containers/signout/signout";

import reducers from "../reducers/";

import * as firebase from "firebase/app";
import "firebase/auth";
import * as React from "react";

import { isAuthenticated, PrivateRoute } from "./private-route/private-route";

import { LoginState } from "../components";

import thunkMiddleware from "redux-thunk";

import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";

import "./style.css";

interface IAppProps {
  history?: any;
  location?: any;
}

interface IAppState {
  loginState?: LoginState;
  forceSignout?: boolean;
  maxHeight?: number;
}

const config = {
  apiKey: "AIzaSyAWwMXVEZxjKjmoZldzwhdQCuA5RkNUpz0",
  authDomain: "notifly-dbce7.firebaseapp.com",
  databaseURL: "https://notifly-dbce7.firebaseio.com",
  projectId: "notifly-dbce7",
  storageBucket: "notifly-dbce7.appspot.com",
  messagingSenderId: "319741107274"
};

firebase.initializeApp(config);

class App extends React.Component<IAppProps, IAppState> {
  public constructor(props: IAppProps) {
    super(props);

    this.state = {
      forceSignout: false
    };
  }

  public componentDidMount() {
    if (typeof window !== "undefined") {
      const { history } = this.props;

      window.addEventListener("storage", e => {
        if (
          (!isAuthenticated('adminAuth') || !isAuthenticated('userAuth')) && history &&
            history.location.pathname !== "/signin"
        ) {
          this.setState({ forceSignout: true });
        }
      });
    }
  }

  public render() {
    const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));
    const { forceSignout, maxHeight } = this.state;

    return (
      <Provider store={store}>
        <div id="app-container" style={{ height: maxHeight }}>
          <BrowserRouter>
            <Switch>
              <Route
                exact={true}
                path="/"
                render={() => <Redirect to="/signin" />}
              />
              {process.env.REACT_APP_STAGE === "development" ? 
                <Route
                  render={routeProps => (
                    <React.Fragment>
                    <AdminSchedule routeProps={routeProps} {...this.props as any} />
                    {/* {routeProps.history.go} */}
                    </React.Fragment>
                    )}
                  path="/schedule"
                />
                : 
                <PrivateRoute
                  component={AdminSchedule}
                  path="/schedule"
                  redirectPath="/signin"
                  storageItem='adminAuth'
                />
              }
              <Route
                render={routeProps => (
                  <Error routeProps={routeProps} {...this.props as any} />
                )}
                path="/error"
              />
              <Route
                render={routeProps => (
                  <UserSchedule routeProps={routeProps} {...this.props as any} />
                )}
                path="/user"
              />
              {process.env.REACT_APP_STAGE === "development" ? 
                  <Route
                    render={routeProps => (
                      <Settings routeProps={routeProps} {...this.props as any} />
                    )}
                    path="/settings"
                  />
                : 
                <PrivateRoute
                  path="/settings"
                  redirectPath="/signin"
                  storageItem='adminAuth'
                  component={Settings}
                />
              }
              <PrivateRoute
                path="/signout"
                redirectPath="/signin"
                storageItem='adminAuth'
                forceSignout={forceSignout}
                component={SignOut}
              />
              <Route
                path="/signin"
                render={routeProps =>
                  isAuthenticated('adminAuth') ? (
                    <Redirect to="/schedule" />
                  ) : (
                    <SignIn routeProps={routeProps} {...this.props as any} />
                  )}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
