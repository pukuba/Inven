
module.exports = {
    session: async(parent, args,{ db,session }) => session.status == "Login"
}