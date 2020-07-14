const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { readFileSync } = require('fs')
const { MongoClient } = require('mongodb')
const path = require('path')
require('dotenv').config()

const session = {name:"NULL",status:"Logout"}
const resolvers = require('./resolvers')
const typeDefs = readFileSync('./typeDefs.graphql', 'utf-8')

async function start(){
    const app = express() 
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
        context: async() => {
            return {db,session}
        }
        
    })
    server.applyMiddleware({ app })
    app.use(express.static(path.join(__dirname,'models')))
    app.get('/playground',expressPlayground({ endpoint: '/graphql'}))
    app.listen({ port : 4444}, ()=> console.log(`running server on http://localhost:4444${server.graphqlPath}`))
}

start()