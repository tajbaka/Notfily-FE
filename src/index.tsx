import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";

import * as React from "react";
import * as ReactDOM from "react-dom";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
