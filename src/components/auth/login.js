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
      {errors.username && <p className="error">{errors.username}</p>}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={values.username}
        onChange={update}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={update}
      />
    </form>
  );
}

Login.propTypes = {
  onUpdate: propTypes.func.isRequired,
  values: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};
