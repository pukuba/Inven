var Iamport = require('iamport');
const fetch = require("node-fetch")
const axios = require("axios")
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

const getUser = async (db,token) => {
	const user = await db.collection('user').findOne({token:token})
	if(!user) return null
	return {
		name : user.name,
		money : user.money
	}
}

module.exports = {
    token: async(parent, args,{ db,token }) => token != null,
    latest: async(parent, args,{ db, token}) => db.collection('post').find().sort({"date":-1}).toArray(),
    userPost: async(parent, args,{ db, token}) => db.collection('post').find({"author":args.author}).toArray(),
    buyMoney: async(parent, args,{ db, token}) => {
		const user = await getUser(db,token)
		if(user == null || token == null) return false 
        const t0ken = await axios({
            url:`https://api.iamport.kr/users/getToken`,
            method:'post',
            headers:{ "Content-Type": "application/json" },
            data: iamport
		})
		console.log(user)
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
		return buy.status === 200
    }
}