import React from "react"

import { gql } from "apollo-boost"
import { useMutation } from 'react-apollo-hooks'


const TOKENLOGOUT = gql`
    mutation logUserOut($__:__){
    logUserOut(__:$__) @client
  }
`

export default () => {
    const [tokenLogoutMutation] = useMutation(TOKENLOGOUT)

    const handleClick = () => {
        try {
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