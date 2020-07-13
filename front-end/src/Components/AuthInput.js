import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Input = styled.input`
    height: 40px;
    background-color: #ffffff;
    border: solid 1px #dadada;
    margin-bottom: 15px;
    font-size: 15px;
    padding: 10px;
`



const AuthInput = ({placeholder, value, onChange, type = "text"}) =>{
    return (
        <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        />
    )
}

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string
}

export default AuthInput