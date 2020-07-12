const crypto = require('crypto');

const makePw = (x,y) => crypto.createHash("sha512").update(x + y).digest("hex");

const stringCheck = (x) => ('0' <= x && x <= '9' || 'a' <= x && x <= 'z' || 'A' <= x && x <= 'Z') 

module.exports = {
    join: async(parent, args,{ db }) => {
        const id = await db.collection('user').findOne({id:args.id}), name = await db.collection('user').findOne({name:args.name})
        if(id != null || !stringCheck(args.id) || args.id.length < 6) return "id에 오류가 있습니다."
        if(name != null || !stringCheck(args.name) || args.name.length < 6) return "name에 오류가 있습니다."
        if(args.pw.length < 6) return "pw에 오류가 있습니다."
        let seed = Math.round((new Date().valueOf() * Math.random())) + "";
        const user = [{
            id:args.id,
            pw:makePw(args.pw,seed),
            name:args.name,
            level:1,
            exp:0,
            icon:1,
            seed:seed
        }]
        await db.collection('user').insertMany(user)
        return "true"
    },

    login: async(parent, args,{ db,session }) => {
        const id = args.id, pw = args.pw, info = await db.collection('user').findOne({id:args.id})
        if(info === null) return false
        if(args.id == info.id && info.pw == makePw(args.pw,info.seed)){
            session.name = info.name
            session.status = "Login"
            return true
        }
        return false
    }
}