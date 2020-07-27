import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import * as yup from "yup";

const initialLoginFormValues = {
  username: "",
  password: "",
};

const initialRegisterFormValues = {
  username: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
};

const initialLoginErrorValues = {
  username: "",
  password: "",
};

const initialRegisterErrorValues = {
  username: "",
  password: "",
  passwordConfirm: "",
  firstName: "",
  lastName: "",
};

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background: ${(props) => (props.background ? props.background : "black")};
  color: ${(props) => (props.color ? props.color : "green")};
`;

export default function UserAuth() {
  // Login form state
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );
  // Register form state
  const [registerFormValues, setRegisterFormValues] = useState(
    initialRegisterFormValues
  );
  // Login form errors state
  const [loginErrorValues, setLoginErrorValues] = useState(
    initialLoginErrorValues
  );
  // Register form errors state
  const [registerErrorValues, setRegisterErrorValues] = useState(
    initialRegisterErrorValues
  );
  // Not to be passed down though props. Use onLoginUpdate or onRegisterUpdate instead
  function onGlobalUpdate(itemName, itemValue, formName) {
    if (formName === "login") {
      setLoginFormValues({ ...loginFormValues, [itemName]: itemValue });
    } else if (formName === "register") {
      setRegisterFormValues({ ...registerFormValues, [itemName]: itemValue });
    }
  }

  function onLoginUpdate(name, value) {
    onGlobalUpdate(name, value, "login");
  }
  function onRegisterUpdate(name, value) {
    onGlobalUpdate(name, value, "register");
  }

  return (
    <AuthContainer
      background={COLORS.primary}
      color={COLORS.secondary}
    ></AuthContainer>
  );
}
