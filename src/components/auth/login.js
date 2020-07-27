import React from "react";
import propTypes from 'prop-types';

export default function Login(props) {
    const {onUpdate, values, errors} = props;
  return <form></form>;
}

Login.propTypes = {
    onUpdate = propTypes.func.isRequired,
    values = propTypes.object.isRequired,
    errors = propTypes.object.isRequired
}