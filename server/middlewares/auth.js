const { verifyToken } = require("../services/auth")
function checkForAuthentication(req, res, next) {
    console.log("Auth middleware was called")
    const userUid = req.cookies?.uid;
    if (userUid) {
        const user = verifyToken(userUid);
        console.log(user)
        if (user) {
            req.user = user
        }
    }
    next();
}
module.exports = { checkForAuthentication }