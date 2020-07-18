import React from "react"

import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'


const TOKENLOGOUT = gql`
    mutation logUserOut($__:__){
    logUserOut(__:$__) @client
  }
`
const LOGOUT = gql`
    mutation logout{
        logout
    }
`

export default () => {

    const [logoutMutation] = useMutation(LOGOUT)
    const [tokenLogoutMutation] = useMutation(TOKENLOGOUT)
    const handleClick = () => {
        try {
            logoutMutation()
            tokenLogoutMutation()
            setTimeout(() => {
            window.location.reload()
            }, 2000)
        } catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}