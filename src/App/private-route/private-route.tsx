// tslint:disable jsx-no-lambda
import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface IPrivateRouteProps extends RouteProps {
  component: new (props: any) => React.Component;
  forceSignout?: boolean;
  storageItem: string;
  redirectPath: string;
}

export const PrivateRoute = ({
  component: Component,
  forceSignout,
  redirectPath,
  storageItem,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        isAuthenticated(storageItem, forceSignout) ? (
          React.createElement(Component, Object.assign({}, { routeProps }))
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: routeProps.location }
            }}
          />
        )}
    />
  );
};

export function isAuthenticated(storageItem: string, forceSignout?: boolean) {
  if (typeof localStorage !== "undefined" || localStorage !== null) {
    let auth = localStorage.getItem(storageItem);
    if (auth) {
      auth = JSON.parse(auth);
    }
    if (auth === null || forceSignout) {
      return false;
    }
    return true;
  }
  return false;
}
