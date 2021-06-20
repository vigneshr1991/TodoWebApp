import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { StateProvider } from './AppState'
import Todos from "./components/Todo";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <CssBaseline />
      <Todos />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
