import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { reducer } from "./rental/reducers";

const storeOne = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Router>
      <Provider store={storeOne}>
        <App />
      </Provider>
    </Router>,
  document.querySelector("#root")
);
