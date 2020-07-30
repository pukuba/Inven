module.exports = {
    newChat: {
        subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('chat-added' + args.channel)
    },
    newPost: {
        subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('post-added' + args.name)
    }
}