import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
const globalAny: any = global;

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

globalAny.localStorage = localStorageMock;
