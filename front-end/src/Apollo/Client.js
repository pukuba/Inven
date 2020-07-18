import ApolloClient, { InMemoryCache } from "apollo-boost"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"

const defaults = {
    check: Boolean(localStorage.getItem("token")) || false
}

const resolvers = {
    Mutation: {
        logUserIn: (_, { token }, { cache }) => {
            localStorage.setItem("token", token)
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            })
            return null
        },
        logUserOut: (_, __, { cache }) => {
            localStorage.removeItem("token")
            window.location = "/"
            return null
        }
    }
}

const client = new ApolloClient({
    uri: "http://localhost:4444/graphql",
    cache: new InMemoryCache(),
    request: (operation) => {
      const token = localStorage.getItem('token')
      operation.setContext({
        headers: {
          authorization: token ? `${token}` : ''
        }
      })
    },
    clientState: {
        defaults,
        resolvers
    }
  })

export default client
