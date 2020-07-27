import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

  return <AuthContainer></AuthContainer>;
}
