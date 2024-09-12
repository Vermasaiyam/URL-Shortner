// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');

const secret = "S@iyam123"

function setUser(user){
    // function setUser(id, user){
    // sessionIdToUserMap.set(id, user);
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

function getUser(token){
    if (!token) return null;
    try{
        return jwt.verify(token, secret);
    }
    catch(error){
        return null;
    }
}

module.exports = {
    getUser, setUser,
}