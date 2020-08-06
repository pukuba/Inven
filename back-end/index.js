const { ApolloServer,PubSub } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')
const { MongoClient } = require('mongodb')

const { createServer } = require('http')

const depthLimit = require('graphql-depth-limit')
const { createComplexityLimitRule } = require('graphql-validation-complexity')

const path = require('path')
require('dotenv').config()

const resolvers = require('./resolvers')
const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')

const start  = async() => {
    const app = express() 
    const pubsub = new PubSub()
    const client = await MongoClient.connect(
        process.env.DB_HOST,
        {
            useUnifiedTopology: true,
            useNewUrlParser : true,
        }
    ) 
    const db = client.db()
    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        validationRules: [
            depthLimit(10),
            createComplexityLimitRule(10000, {
                onCost: cost => console.log('query cost: ', cost)
            })
        ],
        context: async({ req, connection }) => {
            const token = req ? req.headers.authorization : connection.context.Authorization
            return {db, token, pubsub}
        }
    })
    server.applyMiddleware({ app })

    app.get('/playground',expressPlayground({ endpoint: '/graphql'}))
    //app.use(express.static(path.join(__dirname,'models','photo')))

    app.use('/image/',express.static(path.join(__dirname,'models/photo')))
    app.use('/icon/',express.static(path.join(__dirname,'models/icons')))

    const httpServer = createServer(app)
    server.installSubscriptionHandlers(httpServer)
    
    httpServer.timeout = 10000

    httpServer.listen({ port : 4444}, () =>{
        console.log(`GQL Server running at http://localhost:4444${server.graphqlPath}`)
        console.log(`Subscriptions ready at ws://localhost:4444${server.subscriptionsPath}`)
        }
    )
}

start()