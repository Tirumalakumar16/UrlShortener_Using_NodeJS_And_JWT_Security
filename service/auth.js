// maintain a map of sessionId to userId
// setUserId(sessionId,user) : sets the sessionId to userId mapping
// map is static and will be used to maintain the session for temporary storage
// when ever server restarts the map will be empty
const sessionIdToMap = new Map();

function setUserId(id , user) {
    sessionIdToMap.set(id,user)

}

function getUserId(id) {
    return sessionIdToMap.get(id)
}


module.exports = {
    setUserId,
    getUserId
}