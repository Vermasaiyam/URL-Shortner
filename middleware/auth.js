const { getUser } = require("../services/auth");

// function checkForAuthentication(req, res, next){

// }

async function restrictedToLoggedInUserOnly(req, res, next){
    const userUid = req.cookies?.uid;

    if (!userUid){
        return res.redirect('/login');
    }
    const user = getUser(userUid);

    if (!user){
        return res.render('/login');
    }

    req.user = user;
    next();
}

async function checkAuth(req, res, next){
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
}

module.exports = {
    restrictedToLoggedInUserOnly,
    checkAuth,
};