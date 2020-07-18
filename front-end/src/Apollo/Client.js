import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';


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

const request = /*async*/ (operation) => {
    const token = /*await*/ localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  };

const cache = new InMemoryCache({
    // cacheRedirects: {
    //   Query: {
    //     movie: (_, { id }, { getCacheKey }) =>
    //       getCacheKey({ __typename: 'Movie', id });
    //   }
    // }
  });

const requestLink = new ApolloLink((operation, forward) => 
  new Observable(observer => {
      let handle
      Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
          handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
          })
      })
      .catch(observer.error.bind(observer))

      return () => {
          if(handle) handle.unsubscribe()
      }
  })
)


const apollolink = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
        if(graphQLErrors)
            graphQLErrors.map(({ message, locations, path}) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            ),
        )
        if(networkError) {
            // logoutuser
            console.log(`[Network error]: ${networkError}`)
        }
    }),
    requestLink,
    withClientState({
        defaults,
        resolvers,
        cache
    }),
    new HttpLink({
        uri: "http://localhost:4444/graphql",
        credentials: 'same-origin'
    })
])


const client_v2_5 = new ApolloClient({
    link: apollolink,
    cache
  });

export default client_v2_5




// const client = new ApolloClient({
//     uri: "http://localhost:4444/graphql",
//     cache: new InMemoryCache(),
//     request: (operation) => {
//       const token = localStorage.getItem('token')
//       operation.setContext({
//         headers: {
//           authorization: token ? `${token}` : ''
//         }
//       })
//     },
//     clientState: {
//         defaults,
//         resolvers
//     }
//   })