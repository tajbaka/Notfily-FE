// tslint:disable prefer-const
import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { SignOut } from "./signout";

configure({ adapter: new Adapter() });

describe("SignOut", () => {
  let props: any;
  let mountedSignOutScreen: any;
  const signOutScreen = () => {
    if (!mountedSignOutScreen) {
      mountedSignOutScreen = mount(<SignOut {...props} />);
    }
    return mountedSignOutScreen;
  };

  beforeEach(() => {
    mountedSignOutScreen = undefined;
  });

  it("always renders a Sidebar", () => {
    expect(signOutScreen().find("div").length).toBe(1);
  });
});
