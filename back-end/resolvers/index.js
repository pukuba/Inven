const Mutation = require('./Mutation')
const Query = require('./Query')
const Subscription = require('./Subscription')
const resolvers = {
    Query,
    Mutation,
    Subscription,
}

module.exports = resolvers