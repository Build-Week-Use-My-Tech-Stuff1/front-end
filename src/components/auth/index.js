import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const initialLoginFormValues = {
    username: "",
    password: ""
}

const initialRegisterFormValues = {
    username: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: ""
}

const AuthContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export default function UserAuth(){
    return(
        <AuthContainer>
            
        </AuthContainer>
    )
}