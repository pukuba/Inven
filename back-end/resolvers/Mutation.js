const crypto = require('crypto');

const makePw = (x,y) => crypto.createHash("sha512").update(x + y).digest("hex");

const stringCheck = (x) => ('0' <= x && x <= '9' || 'a' <= x && x <= 'z' || 'A' <= x && x <= 'Z') 

module.exports = {
    join: async(parent,args,{ db }) => {
        const check1 = await db.collection('user').findOne({title:args.id})
        const check2 = await db.collection('user').findOne({title:args.name})
        if(check1 != null || !stringCheck(args.id)) return "id에 오류가 있습니다."
        if(check2 != null || !stringCheck(args.name)) return "name에 오류가 있습니다."
        if(args.pw < 7) return "pw에 오류가 있습니다."
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
        return "true"
    }

}