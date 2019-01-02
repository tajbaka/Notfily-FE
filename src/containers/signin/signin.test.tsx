// tslint:disable prefer-const
import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { SignIn } from "./signin";

import { SignInForm } from "../../components";

configure({ adapter: new Adapter() });

describe("SignIn", () => {
  let props: any;
  let mountedSignInScreen: any;
  const signInScreen = () => {
    if (!mountedSignInScreen) {
      mountedSignInScreen = mount(<SignIn {...props} />);
    }
    return mountedSignInScreen;
  };

  beforeEach(() => {
    mountedSignInScreen = undefined;
  });

  it("always renders a sign in form", () => {
    expect(signInScreen().find(SignInForm).length).toBe(1);
  });
});
