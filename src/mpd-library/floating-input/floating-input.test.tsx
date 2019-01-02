import { configure, mount } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";
import { MPDFloatingInput } from "../";

configure({ adapter: new Adapter() });

describe("MPDButton", () => {
  let props: any;
  let mountedMPDFloatingInput: any;
  const MPDFloatingInputComponent = () => {
    if (!mountedMPDFloatingInput) {
      mountedMPDFloatingInput = mount(<MPDFloatingInput {...props} />);
    }
    return mountedMPDFloatingInput;
  };

  beforeEach(() => {
    props = {
      placeholder: undefined,
      name: undefined
    };
    mountedMPDFloatingInput = undefined;
  });

  it("always renders a div", () => {
    expect(MPDFloatingInputComponent().find("div").length).toBe(1);
  });

  it("always renders an input", () => {
    expect(MPDFloatingInputComponent().find("input").length).toBe(1);
  });

  it("always renders a span", () => {
    expect(MPDFloatingInputComponent().find("span").length).toBe(1);
  });

  it("input always has name", () => {
    MPDFloatingInputComponent().setProps({ name: "input" });
    expect(
      MPDFloatingInputComponent()
        .find("input")
        .props().name === MPDFloatingInputComponent().props().name
    ).toBe(true);
  });

  it("span always has placeholder", () => {
    MPDFloatingInputComponent().setProps({ placeholder: "label" });
    const childrenArr = MPDFloatingInputComponent()
      .find("span")
      .props().children;
    const index = childrenArr.indexOf(
      MPDFloatingInputComponent().props().placeholder
    );
    expect(index).toBeGreaterThan(-1);
  });

  it("MPDFloatingInput focus test", () => {
    expect(
      MPDFloatingInputComponent()
        .instance()
        .setFocus(true)
    ).toBe(true);
  });

  it("component always has componentwillreceieveprops", () => {
    expect(
      MPDFloatingInputComponent().instance().componentWillReceiveProps.length
    ).toBe(1);
  });
});
