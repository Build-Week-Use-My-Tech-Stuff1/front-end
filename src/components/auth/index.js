import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { USER_LOGIN_SCHEMA, USER_REGISTRATION_SCHEMA } from "../schemas";
import propTypes from "prop-types";
import * as yup from "yup";
import Login from "./login";
import Register from "./register";
import axios from "axios";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

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
      border-bottom: thin solid
        ${(props) => (props.color ? props.color : "green")};
      .header-btn {
        transition: 0.125s ease-in-out all;
        padding: 0.5rem 0rem;
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
          &:hover {
            cursor: not-allowed;
          }
        }
      }
    }
    form {
      display: grid;
      grid-template-columns: "50% 50%";
      width: 100%;
      grid-gap: 1rem;
      padding: 2rem;
      label {
        font-size: 1.5rem;
        grid-column-start: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input {
        grid-column: 2;
        text-align: center;
        background: ${(props) =>
          props.background ? props.background : "black"};
        color: ${COLORS.secondary};
        border-color: ${(props) => (props.color ? props.color : "green")};
        padding: 0.25rem 0rem;
        border-radius: 0.5rem;
      }
      .error {
        grid-column: 1 / span 2;
        color: red;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 1.5rem;
        width: 100%;
      }
      .submit {
        margin-top: 2rem;
        grid-column: 1 / span 2;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 75%;
          background: ${(props) => (props.color ? props.color : "green")};
          border: none;
          font-size: 2rem;
          padding: 0.25rem 0rem;
          color: ${(props) => (props.background ? props.background : "black")};
          &:hover {
            cursor: pointer;
          }
          &:disabled {
            background: ${(props) =>
              props.background ? props.background : "black"};
            color: ${(props) => (props.color ? props.color : "green")};
            text-decoration: line-through;
            &:hover {
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }
`;

export default function UserAuth(props) {
  const { navbarHeight } = props;
  let history = useHistory();

  // THE STATES FOR THE AUTH FORM

  // The currently displayed form
  const [currentForm, setCurrentForm] = useState("login");

  // Login form state
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );

  // If schema is valid, allow login
  const [loginAllowed, setLoginAllowed] = useState(false);

  // Register form state
  const [registerFormValues, setRegisterFormValues] = useState(
    initialRegisterFormValues
  );

  // If schema is valid, allow register
  const [registerAllowed, setRegisterAllowed] = useState(false);

  // Login form errors state
  const [loginErrorValues, setLoginErrorValues] = useState(
    initialLoginErrorValues
  );

  // Register form errors state
  const [registerErrorValues, setRegisterErrorValues] = useState(
    initialRegisterErrorValues
  );

  // THE HOOKS FOR THE AUTH FORM

  // If valid schema, allow login
  useEffect(() => {
    USER_LOGIN_SCHEMA.validate(loginFormValues)
      .then(() => {
        setLoginAllowed(true);
      })
      .catch(() => {
        setLoginAllowed(false);
      });
  }, [loginFormValues]);

  // If valid schema, allow register
  useEffect(() => {
    USER_REGISTRATION_SCHEMA.validate(registerFormValues)
      .then(() => {
        setRegisterAllowed(true);
      })
      .catch(() => {
        setRegisterAllowed(false);
      });
  }, [registerFormValues]);

  // AUTH FORM LOGIC AND CALLBACKS

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
    yup
      .reach(USER_LOGIN_SCHEMA, name)
      .validate(value)
      .then(() => setLoginErrorValues({ ...loginErrorValues, [name]: "" }))
      .catch((err) =>
        setLoginErrorValues({ ...loginErrorValues, [name]: err.errors[0] })
      );
  }
  function onRegisterUpdate(name, value) {
    onGlobalUpdate(name, value, "register");
    yup
      .reach(USER_REGISTRATION_SCHEMA, name)
      .validate(value)
      .then(() =>
        setRegisterErrorValues({ ...registerErrorValues, [name]: "" })
      )
      .catch((err) =>
        setRegisterErrorValues({
          ...registerErrorValues,
          [name]: err.errors[0],
        })
      );
  }
  
  function onRegisterSubmit() {
    if (registerFormValues.password !== registerFormValues.passwordConfirm) {
      setRegisterErrorValues({
        ...registerErrorValues,
        password: "Your passwords must match",
      });
    } else {
      setRegisterErrorValues({ ...registerErrorValues, password: "" });
      USER_REGISTRATION_SCHEMA.validate(registerFormValues);
      //logging each register form values
      const newUser = {
        username: registerFormValues.username.trim(),
        firstName: registerFormValues.firstName.trim(),
        lastName: registerFormValues.lastName.trim(),
        password: registerFormValues.password.trim(),
      };
      //posting the new register values to users data
        axios.post("https://bw-usemytechstuff.herokuapp.com/api/register", newUser)
        .then((res) => {
          console.log(res)
          //generating new token for new user
          localStorage.setItem("token", res.data.token)
          history.push("/auth")
          window.location.assign('/auth')
          })
        .catch((err) => {
          console.log(err)
        })
    }    
  }

  function onLoginSubmit() {
    USER_LOGIN_SCHEMA.validate(loginFormValues);

    axiosWithAuth()
      .post("/api/login", loginFormValues)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        history.push("./dashboard");
      })
      .catch(error => console.log(error))
  }

  // Logic that shows the form selected by the user via state
  function showForm() {
    if (currentForm === "login") {
      return (
        <Login
          onUpdate={onLoginUpdate}
          values={loginFormValues}
          errors={loginErrorValues}
          onSubmit={onLoginSubmit}
          allowSubmit={loginAllowed}
        />
      );
    } else {
      return (
        <Register
          onUpdate={onRegisterUpdate}
          values={registerFormValues}
          errors={registerErrorValues}
          onSubmit={onRegisterSubmit}
          allowSubmit={registerAllowed}
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

// Properties used by the auth form
UserAuth.propTypes = {
  navbarHeight: propTypes.string
}
