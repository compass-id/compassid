import React from "react";
import "./styles/index.css";
import "./styles/style.css";
import App from "./App";
import ReactDOM from "react-dom/client";

const APP = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(APP);
