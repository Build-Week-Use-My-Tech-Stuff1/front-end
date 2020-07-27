import React from "react";
import propTypes from 'prop-types';

export default function Register(props) {
    const {onUpdate, values, errors} = props;

    function update(event){
        const {name, value} = event.target;
        onUpdate(name, value);
    }

    function submit(event){
        
    }
  return <form></form>;
}

Register.propTypes = {
    onUpdate = propTypes.func.isRequired,
    values = propTypes.object.isRequired,
    errors = propTypes.object.isRequired
}