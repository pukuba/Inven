var Iamport = require('iamport');
const fetch = require("node-fetch")
const axios = require("axios")
const jwt = require('jsonwebtoken');

const inMemory = require('./Inmemory')

let iamport = {
    'imp_key': process.env.API_KEY,
    'imp_secret': process.env.API_SECRET_KEY
};

const buyMoneyBody = (args,x) => {
	return {
		'merchant_uid':x,
		'amount':args.amount,
		'card_number':args.card_number,
		'expiry':args.expiry,
		'birth':args.birth,
		'pwd_2digit':args.pwd_2digit,
		'name':"이니구매",
		'buyer_name':args.buyer_name,
		'buyer_email':args.buyer_email,
		'buyer_tel':args.buyer_tel
	}
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

const status = (x,stat,k) => {
	let check = 0,newDate = new Date(),time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS'),ret = []
	for(let [key, value] of inMemory.user){
		if(k === -1){
			ret.push(key)
			continue
		}
		if(value > time) inMemory.user.delete(key)
		if(key === x){
			check = 1
			if(value !== stat) inMemory.user.delete(key),inMemory.user.set(x,stat)
		}
	}
	if(!check && !k) inMemory.user.set(x,stat)
	if(k === -1) return ret
}
module.exports = {
	token: async(parent, args, { db, token }) => {
		const user = checkToken(token)
		if(user.name) status(user.name,user.exp)
		return user.name ? 200 : 401
	},
	online: async(parent, args, {db, token }) => {
		return {
			count: inMemory.user.size,
			name: status(0,0,-1)
		}
	},
    latest: async(parent, args,{ db, token}) => db.collection('post').find().sort({"date":-1}).toArray(),
    userPost: async(parent, args,{ db, token}) => db.collection('post').find({"author":args.author}).toArray(),
    buyMoney: async(parent, args,{ db, token}) => {
		let user 
		try{
			user = jwt.verify(token,process.env.JWT_SECRET)
		} catch {
			return 401
		}
        const t0ken = await axios({
            url:`https://api.iamport.kr/users/getToken`,
            method:'post',
            headers:{ "Content-Type": "application/json" },
            data: iamport
		})
		const buyInfo = await db.collection('payment').find().sort({"id":-1}).limit(1).toArray()
		const dataUid = (!buyInfo.length ? 1 : buyInfo[0].id + 1)
		let newDate = new Date(),time = newDate.toFormat('YYYY-MM-DD HH24:MI:SS')
		const buy = await axios({
			url:'https://api.iamport.kr/subscribe/payments/onetime',
			method:'post',
			headers:{
				'Content-Type': 'application/json',
				'Authorization': t0ken.data.response.access_token
			},
			data:buyMoneyBody(args,time + dataUid)
		})
		if(buy.status === 200){
			const input = [{
				name:user.name,
				id:dataUid,
				amount:args.amount,
				merchant_uid:time + dataUid,
				imp_uid:buy.data.response.imp_uid
			}]
			await db.collection('payment').insertMany(input)	
			await db.collection('user').updateMany({name:user.name},{$set:{'money' : user.money + args.amount}})
		}
		return buy.status
    }
}