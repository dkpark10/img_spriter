import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, Store } from "redux";
import App from "./app";
import rootReducer from "./reducer/index";
import "./index.css";

const store: Store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
