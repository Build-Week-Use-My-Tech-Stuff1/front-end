import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import propTypes from "prop-types";
import * as yup from "yup";
import Login from "./login";
import Register from "./register";

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
  height: calc(
    100vh - ${(props) => (props.navbarHeight ? props.navbarHeight : "7rem")}
  );
  width: 100%;
  background: ${(props) => (props.background ? props.background : "black")};
  color: ${(props) => (props.color ? props.color : "green")};
  form {
    padding: 5rem ${5 * (16 / 9)}rem;
    box-shadow: 0rem 0rem 0.5rem 0rem
      ${(props) => (props.color ? props.color : "green")};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    text-align: center;
    font-size: 1.5rem;
    input {
      background: ${(props) => (props.background ? props.background : "black")};
      border-color: ${(props) => (props.color ? props.color : "green")};
      color: ${(props) => (props.color ? props.color : "green")};
      text-align: center;
      border-radius: 0.25rem;
      &:focus {
        border-color: green;
      }
    }
  }
`;

export default function UserAuth(props) {
  const { navbarHeight } = props;

  const [currentForm, setCurrentForm] = useState("login");

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
  // Not to be passeddependancies down though props. Use onLoginUpdate or onRegisterUpdate instead
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

  function showForm() {
    if (currentForm === "login") {
      return (
        <Login
          onUpdate={onLoginUpdate}
          values={loginFormValues}
          errors={registerErrorValues}
        />
      );
    } else {
      return (
        <Register
          onUpdate={onRegisterUpdate}
          values={registerFormValues}
          errors={registerErrorValues}
        />
      );
    }
  }

  return (
    <AuthContainer
      background={COLORS.primary}
      color={COLORS.secondary}
      navbarHeight={navbarHeight}
    >
      {showForm()}
    </AuthContainer>
  );
}

UserAuth.propTypes = {
  navbarHeight: propTypes.string,
};
