import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { StateProvider } from './AppState';
import ErrorBoundary from './components/Shared/ErrorBoundary';
import Todos from "./components/Todo";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <ErrorBoundary>
        <CssBaseline />
        <Todos />
      </ErrorBoundary>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
