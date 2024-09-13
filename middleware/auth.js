const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next){
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) {
        return next();
    } 

    const token = tokenCookie.split("Bearer ")[1];

    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles){
    return function(req, res, next){
        if (!req.user) return res.redirect('/login');

        if (!roles.includes(req.user.role)){
            res.end("Unauthorized");
        }

        next();
    }

}

module.exports = {
    checkForAuthentication,
    restrictTo,
};