import React from "react";
import propTypes from "prop-types";

export default function Register(props) {
  const { onUpdate, values, errors, allowSubmit, onSubmit } = props;

  function update(event) {
    const { name, value } = event.target;
    onUpdate(name, value);
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
        onChange={update}
        value={values.username}
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        onChange={update}
        value={values.firstName}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        onChange={update}
        value={values.lastName}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={update}
        value={values.password}
      />
      {errors.passwordConfirm && (
        <p className="error">{errors.passwordConfirm}</p>
      )}
      <label htmlFor="passwordConfirm">Confirm Password</label>
      <input
        type="password"
        name="passwordConfirm"
        onChange={update}
        value={values.passwordConfirm}
      />
      <div className="submit">
        <button disabled={!allowSubmit}>Submit</button>
      </div>
    </form>
  );
}

Register.propTypes = {
  onUpdate: propTypes.func.isRequired,
  values: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};
