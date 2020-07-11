const crypto = require('crypto');
const { createSecureServer } = require('http2');

const makePw = (x,y) => crypto.createHash("sha512").update(x + y).digest("hex");

module.exports = {
    join: async(parent,args,{ db }) => {
        if(!args.check) return false
        let seed = Math.round((new Date().valueOf() * Math.random())) + "";
        const user = [{
            id:args.id,
            pw:makePw(args.id,seed),
            name:args.name,
            level:1,
            exp:0,
            icon:1,
            seed:seed
        }]
        await db.collection('Inven').insertMany(user)
        return true
    }

}