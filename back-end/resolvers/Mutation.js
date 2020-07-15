const crypto = require('crypto');
require('date-utils')
const makePw = (x,y) => crypto.createHash("sha512").update(x + y).digest("hex");

const stringCheck = (x) => ('0' <= x && x <= '9' || 'a' <= x && x <= 'z' || 'A' <= x && x <= 'Z') 

module.exports = {
    join: async(parent, args,{ db,session }) => {
        const id = await db.collection('user').findOne({id:args.id}), name = await db.collection('user').findOne({name:args.name})
        if(id != null || !stringCheck(args.id) || args.id.length < 6) return "id에 오류가 있습니다."
        if(name != null || !stringCheck(args.name) || args.name.length < 6) return "name에 오류가 있습니다."
        if(args.pw.length < 6) return "pw에 오류가 있습니다."
        let seed = Math.round((new Date().valueOf() * Math.random())) + "";
        const user = [{
            id:args.id,
            pw:makePw(args.pw,seed),
            name:args.name,
            money:0,
            level:1,
            exp:0,
            icon:1,
            seed:seed,
            token:null
        }]
        await db.collection('user').insertMany(user)
        return "true"
    },

    login: async(parent, args,{ db,token }) => {
        const id = args.id, pw = args.pw, info = await db.collection('user').findOne({id:args.id})
        if(info === null) return false
        if(args.id == info.id && info.pw == makePw(args.pw,info.seed)){
            let seed = Math.round((new Date().valueOf() * Math.random())) + "";
            await db.collection('user').update({id:args.id},{$set:{'token':seed}})
            return seed
        }
        return null
    },

    logout: async(parent, args,{ db,token }) => {
        await db.collection('user').update({token:token},{$set:{'token':null}})
        return true
    },

    create: async(parent, args,{ db,token }) =>{
        if(token == null) return false
        const cnt = await db.collection('post').find().sort({"id":-1}).limit(1).toArray()
        const user = await db.collection('user').findOne({token:token})
        let newDate = new Date()
        let posts = [{
            id: cnt[0] ? cnt[0].id+1 : 1,
            content: args.content,
            author: user.name,
            date: newDate.toFormat('YYYY-MM-DD HH24:MI:SS'),
            type:args.type
        }]
        await db.collection('post').insertMany(posts) 
        return true
    }

}