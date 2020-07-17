var Iamport = require('iamport');

var iamport = new Iamport({
    impKey: process.env.API_SECRET_KEY,
    impSecret: process.env.API_KEY
  });


module.exports = {
    token: async(parent, args,{ db,token }) => token != null,
    latest: async(parent, args,{ db, token}) => db.collection('post').find().sort({"date":-1}).limit(20).toArray(),
    userPost: async(parent, args,{ db, token}) => db.collection('post').find({"author":args.author}).toArray(),
}