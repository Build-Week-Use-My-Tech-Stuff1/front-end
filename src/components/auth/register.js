import React from "react";
import propTypes from "prop-types";

export default function Register(props) {
  const { onUpdate, values, errors } = props;

  function update(event) {
    const { name, value } = event.target;
    onUpdate(name, value);
  }

  function submit(event) {}
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        onChange={update}
        value={values.username}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        onChange={update}
        value={values.firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        onChange={update}
        value={values.lastName}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={update}
        value={values.password}
      />
      <label htmlFor="passwordConfirm">Confirm Password</label>
      <input
        type="password"
        name="passwordConfirm"
        onChange={update}
        value={values.passwordConfirm}
      />
    </form>
  );
}

Register.propTypes = {
  onUpdate: propTypes.func.isRequired,
  values: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};
