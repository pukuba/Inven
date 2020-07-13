import ApolloClient from "apollo-boost"

const defaults = {
    check: Boolean(localStorage.getItem("token")) || false
}

const resolvers = {
    Mutation: {
        logUserIn: (_, { token }, { cache }) => {
            localStorage.setItem("token", token)
            return null
        },
        logUserOut: (_, __, { cache }) => {
            localStorage.removeItem("token")
            window.location = "/"
            return null
        }
    }
}

export default new ApolloClient({
    uri: "http://localhost:4000",
    clientState: {
        defaults,
        resolvers
    }
})