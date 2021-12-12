import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

async function prepare() {}

prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root"),
  );
});
