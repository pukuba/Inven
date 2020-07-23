const crypto = require('crypto');
require('date-utils')
const makePw = (x,y) => crypto.createHash("sha512").update(x + y).digest("hex");

const stringCheck = (x) => {
    let go = 0;
    for(let i=0; i<x.length; i++) if(('0' <= x[i] && x[i] <= '9') || ('a' <= x[i] && x[i] <= 'z') || ('A' <= x[i] && x[i] <= 'Z')) go++
    return go == x.length
} 

module.exports = {
    join: async(parent, args,{ db,session }) => {
        const id = await db.collection('user').findOne({id:args.id}), name = await db.collection('user').findOne({name:args.name})
        console.log(id)
        if(id != null || !stringCheck(args.id) || args.id.length < 6) return "id에 오류가 있습니다."
        if(name != null || !stringCheck(args.name) || args.name.length < 6) return "name에 오류가 있습니다."
        if(args.pw.length < 6) return "pw에 오류가 있습니다."
        let seed = Math.round((new Date().valueOf() * Math.random())) + "",newDate = new Date();
        const user = [{
            id:args.id,
            pw:makePw(args.pw,seed),
            name:args.name,
            money:0,
            level:1,
            exp:0,
            icon:1,
            seed:seed,
            token:null,
            latest: newDate.toFormat('YYYY-MM-DD HH24:MI:SS')
        }]
        await db.collection('user').insertMany(user)
        return "true"
    },

    login: async(parent, args,{ db,token }) => {
        const id = args.id, pw = args.pw, info = await db.collection('user').findOne({id:args.id})
        let newDate = new Date(),time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS')
        if(info === null) return false
        if(args.id == info.id && info.pw == makePw(args.pw,info.seed)){
            let token = Math.round((new Date().valueOf() * Math.random())) + "";
            await db.collection('user').updateMany({id:args.id},{$set:{'token':token}})
            if(time[8]+time[9] != info.latest[8]+info.latest[9]){
                await db.collection('user').updateMany({id:args.id},{$set:{'latest' : time}})
                await db.collection('user').updateMany({id:args.id},{$set:{'exp':info.exp+50}})
                info = await db.collection('user').findOne({id:args.id})
                ep = Math.round(100 * Math.pow(1.5,info.level-1))
                if(info.exp >= ep){
                    await db.collection('user').updateMany({id:args.id},{$set:{'level' : info.level+1}})
                    await db.collection('user').updateMany({id:args.id},{$set:{'exp' : exp-ep}})
                }
            }
            return token
        }
        return null
    },

    logout: async(parent, args,{ db,token }) => {
        await db.collection('user').updateMany({token:token},{$set:{'token':null}})
        return true
    },

    create: async(parent, args,{ db,token }) =>{
        if(token == null) return false
        const cnt = await db.collection('post').find().sort({"id":-1}).limit(1).toArray()
        const user = await db.collection('user').findOne({token:token})
        let newDate = new Date()
        let posts = [{
            id: cnt[0] ? cnt[0].id+1 : 1,
            title: args.title,
            content: args.content,
            author: user.name,
            date: newDate.toFormat('YYYY-MM-DD HH24:MI:SS'),
            type: args.type
        }]
        await db.collection('post').insertMany(posts) 
        return true
    }, 

    
}