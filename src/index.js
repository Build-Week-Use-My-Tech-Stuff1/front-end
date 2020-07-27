import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { BrowserRouter as Router } from "react-router-dom";

import OwnerReducer from "./owner/redux/reducer";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk'

const storeTwo =  createStore(OwnerReducer, applyMiddleware(thunk))



ReactDOM.render(
  <Router>
    <Provider store={storeTwo}>
      <App greeting="Hello World!" />
    </Provider>
  </Router>,
  document.querySelector("#root")
);
