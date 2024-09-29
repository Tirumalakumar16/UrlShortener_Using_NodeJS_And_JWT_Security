const {getUserId}= require('../service/auth');

async function  restrictToLoggedInUserOnly(req,res,next) {
    const sessionId = req.cookies?.sessionId;
    if(!sessionId) {
        return res.redirect('/signIn')
    }

    const user = getUserId(sessionId);
    if(!user) {
        return res.redirect('/signIn')
    }

    req.user = user;
    next();
}

async function checkAuth(req,res,next) {
    const sessionId = req.cookies?.sessionId;

    const user = getUserId(sessionId);
    req.user = user;
    next();
}

module.exports = {
        restrictToLoggedInUserOnly,
        checkAuth
}