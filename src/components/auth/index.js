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
  .form-container {
    padding-top: 0rem;
    box-shadow: 0rem 0rem 0.5rem 0rem
      ${(props) => (props.color ? props.color : "green")};
    min-width: 50rem;
    min-height: 20rem;
    border-radius: 1.25rem;
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      font-size: 2rem;
      border-bottom: thin solid green;
      .header-btn {
        transition: 0.125s ease-in-out all;
        padding: 0.5rem 1.5rem;
        overflow: hidden;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:first-child {
          border-top-left-radius: 1.25rem;
        }
        &:last-child {
          border-top-right-radius: 1.25rem;
        }
        &:hover {
          cursor: pointer;
          color: ${(props) => (props.background ? props.background : "black")};
          background: ${(props) => (props.color ? props.color : "green")};
          transition: 0.125s ease-in-out all;
        }
        &.active {
          color: ${(props) => (props.background ? props.background : "black")};
          background: ${(props) => (props.color ? props.color : "green")};
          &:hover{
            cursor: not-allowed;
          }
        }
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

  // Logic that shows the form selected by the user via state
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
      <section className="form-container">
        <div className="header">
          <div
            className={`header-btn ${currentForm === "login" && "active"}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentForm("login");
            }}
          >
            <p>Login</p>
          </div>
          <div
            className={`header-btn ${currentForm === "register" && "active"}`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentForm("register");
            }}
          >
            <p>Register</p>
          </div>
        </div>
        {showForm()}
      </section>
    </AuthContainer>
  );
}

UserAuth.propTypes = {
  navbarHeight: propTypes.string,
};
