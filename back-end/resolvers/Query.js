var Iamport = require('iamport');

var iamport = new Iamport({
    impKey: process.env.API_SECRET_KEY,
    impSecret: process.env.API_KEY
  });


module.exports = {
    token: async(parent, args,{ db,token }) => token != null,
    buyMoney: async(parent,args,{ db,session }) => {
        console.log(iamport.subscribe.sbcr_onetime)
    }
}