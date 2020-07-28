import React, { useState } from "react";
import propTypes from "prop-types";
// import { useHistory } from 'react-router-dom'
// import { axiosWithAuth } from "../../utils/axiosWithAuth";

export default function Login(props) {
  const { onUpdate, values, errors, allowSubmit, onSubmit } = props;

  function update(event) {
    const { name, value } = event.target;
    onUpdate(name, value);

    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  }

  function submit(event) {
    event.preventDefault();
    onSubmit();
  }
  return (
    <form onSubmit={submit}>
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
      <div className="submit">
        <button disabled={!allowSubmit}>Submit</button>
      </div>
    </form>
  );
}

Login.propTypes = {
  onUpdate: propTypes.func.isRequired,
  values: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};
