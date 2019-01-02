import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { MPDButton, MPDIcon } from "../";

import { Button, Text } from "@blueprintjs/core";

configure({ adapter: new Adapter() });

describe("MPDButton", () => {
  let props: any;
  let mountedMPDButton: any;
  const MPDButtonComponent = () => {
    if (!mountedMPDButton) {
      mountedMPDButton = mount(<MPDButton {...props} />);
    }
    return mountedMPDButton;
  };

  beforeEach(() => {
    props = {
      text: undefined,
      name: undefined
    };
    mountedMPDButton = undefined;
  });

  it("always renders a blueprint button", () => {
    expect(MPDButtonComponent().find(Button).length).toBe(1);
  });

  it("always renders a blueprint Text", () => {
    MPDButtonComponent().setProps({ text: "test" });
    expect(MPDButtonComponent().find(Text).length).toBe(1);
  });

  it("Button Text is rendered", () => {
    MPDButtonComponent().setProps({ text: "test" });

    const childrenArr = MPDButtonComponent()
      .find(Text)
      .props().children;

    const index = childrenArr.indexOf(MPDButtonComponent().props().text);
    expect(index).toBeGreaterThan(-1);
  });

  it("Button icon passed to MPDIcon", () => {
    MPDButtonComponent().setProps({ name: "filler" });
    expect(
      MPDButtonComponent()
        .find(MPDIcon)
        .props().name === MPDButtonComponent().props().name
    ).toBe(true);
  });
});
