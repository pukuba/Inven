const crypto = require('crypto');
require('date-utils')
const jwt = require('jsonwebtoken');
const { uploadStream } = require('../lib')
const path = require('path')

const makePw = (x,y) => crypto.createHash("sha512").update(x + y).digest("hex");

const stringCheck = (x) => {
    let go = 0;
    for(let i=0; i<x.length; i++) if(('0' <= x[i] && x[i] <= '9') || ('a' <= x[i] && x[i] <= 'z') || ('A' <= x[i] && x[i] <= 'Z')) go++
    return go == x.length
} 

const checkToken = (token) => {
    let ret = 0;
    try{
        ret = jwt.verify(token,process.env.JWT_SECRET)
    } catch {
        return 401
    }
    return ret
}

module.exports = {
    join: async(parent, args,{ db,token,pubsub }) => {
        const id = await db.collection('user').findOne({id:args.id}), name = await db.collection('user').findOne({name:args.name})
        if(id != null || !stringCheck(args.id) || args.id.length < 6) return "id에 오류가 있습니다."
        if(name != null || !stringCheck(args.name) || args.name.length < 6) return "name에 오류가 있습니다."
        if(args.pw.length < 6) return "pw에 오류가 있습니다."
        let seed = Math.round((new Date().valueOf() * Math.random())) + "",newDate = new Date();
        const newUser = {
            id:args.id,
            pw:makePw(args.pw,seed),
            name:args.name,
            money:0,
            level:1,
            exp:0,
            icon:1,
            seed:seed,
            latest: newDate.toFormat('YYYY-MM-DD HH24:MI:SS')
        }
        await db.collection('user').insertOne(newUser)
        return newUser
    },

    login: async(parent, args,{ db,token }) => {
        const id = args.id, pw = args.pw, info = await db.collection('user').findOne({id:args.id})
        let newDate = new Date(),time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS')
        if(info === null) return false
        if(args.id == info.id && info.pw == makePw(args.pw,info.seed)){
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
            token = jwt.sign({
                name:info.name,
                exp:Math.floor(Date.now() / 1000) + (60 * 60)
            },process.env.JWT_SECRET)
            return token
        }
        return 401
    },

    create: async(parent, args,{ db,token,pubsub }) =>{
        const user = checkToken(token)
        if(user === 401) return {code:401}
        const cnt = await db.collection('post').find().sort({"id":-1}).limit(1).toArray()
        let newDate = new Date()
        let newPost = {
            id: cnt[0] ? cnt[0].id+1 : 1,
            title: args.input.title,
            content: args.input.content,
            author: user.name,
            date: newDate.toFormat('YYYY-MM-DD HH24:MI:SS'),
            type: args.input.type
        }
        const { insertedId } = await db.collection('post').insertOne(newPost) 
        newPost.code = 200
        if(args.input.file){
            const image_path = path.join(__dirname,'../models/photo',`${insertedId}.jpg`)
            const { createReadStream } = await args.input.file    
            const stream = createReadStream(image_path);    
            await uploadStream(stream, image_path) 
      
        }
        const subUser = await db.collection('postSub').find({author:user.name}).toArray()
        subUser.forEach(sub => pubsub.publish('post-added' + sub.name, { newPost }))
        return newPost
    }, 

    chat: async(parent, args, { db, token, pubsub }) => {
        const user = checkToken(token)
        if(user === 401) return {code : 401}
        let newChat = {
            code : 200,
            author : user.name,
            content : args.content
        }
        pubsub.publish('chat-added' + args.channel,{ newChat })
        return newChat
    },

    postSubscription: async(parent, args, {db, token, pubsub }) => {
        const user = checkToken(token)
        if(user === 401) return 401
        const sub = await db.collection('postSub').findOne({name:user.name,author:args.name})
        if(!sub) db.collection('postSub').insertOne({name:user.name,author:args.name})
        else db.collection('postSub').delateOne({name:user.name,author:args.name})
        return 200
    }
}