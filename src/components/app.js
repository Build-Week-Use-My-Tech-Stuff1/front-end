import React, {useState} from "react";
import propTypes from "prop-types";
import Navbar from "./navbar";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import UserAuth from './auth';

const WebContainer = styled.div`
  margin-top: 10rem;
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
          <Route path='/auth'>
            <UserAuth />
          </Route>
          <Route path="/" exact>
            <h1>{greeting}</h1>
          </Route>
        </Switch>
      </WebContainer>
    </React.Fragment>
  );
}

App.propTypes = {
  greeting: propTypes.string,
};
