const stringCheck = (x) =>{
    return ('0' <= x && x <= '9' || 'a' <= x && x <= 'z' || 'A' <= x && x <= 'Z') 
}
module.exports = {
    idCheck: async(parent,args,{ db }) => {
        const check = await db.collection('user').findOne({title:args.id})
        if(check != null) return false
        const str = args.id
        if(str.length < 6 || 16 < str.length) return false
        for(let i=0; i<str.length; i++){
            if(stringCheck(str[i])) continue;
            return false
        }
        return true
    },
    pwCheck: async(parent,args,{ db }) => {
        const check = args.pw
        return check.length > 6
    },
    nameCheck: async(parent,args,{ db }) => {
        const check = await db.collection('user').findOne({name:args.name})
        if(check != null) return false
        const len = args.name
        return len.length > 6
    }
}