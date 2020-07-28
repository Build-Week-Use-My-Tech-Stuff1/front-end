import React, { useState } from "react";
import propTypes from "prop-types";
import Navbar from "./navbar";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import UserAuth from "./auth";
import CreateListing from "./createListing";
import PrivateRoute from "../utils/PrivateRoute";
import Dashboard from "./dashboard";
import Collection from "./Collection";

const WebContainer = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function App(props) {
  const { greeting } = props;

  return (
    <React.Fragment>
      <Navbar />
      <WebContainer>
        <Switch>
          <Route path="/auth">
            <UserAuth navbarHeight="7rem" />
          </Route>
          <Route path="/create">
            <CreateListing navbarHeight="7rem" />
          </Route>
          <Route path="/" exact>
            <h1>{greeting}</h1>
          </Route>
          {/* Will make Dashboard private */}
         <PrivateRoute exact path='/dashboard' component={Dashboard}/>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/collection" component={Collection} />
        </Switch>
      </WebContainer>
    </React.Fragment>
  );
}

App.propTypes = {
  greeting: propTypes.string,
};
