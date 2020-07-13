import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Name = styled.span`
    font-size: 80px;
    font-weight: 900;
    color: #00c84f;
    margin-bottom: 70px;
    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`

const Title = ({title}) => <Name>{title}</Name>

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title