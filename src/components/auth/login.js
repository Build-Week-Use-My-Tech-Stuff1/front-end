import React from "react";
import propTypes from "prop-types";

export default function Login(props) {
  const { onUpdate, values, errors } = props;

  function update(event) {
    const { name, value } = event.target;
    onUpdate(name, value);
  }

  function submit(event) {}
  return (
    <form>
      <label>Username</label>
      <input type="text" />
      <label>Password</label>
      <input type='password' />
    </form>
  );
}

Login.propTypes = {
  onUpdate: propTypes.func.isRequired,
  values: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};
