const { verifyToken } = require("../services/auth")
function checkForAuthentication(req, res, next) {
    console.log("Auth middleware was called")
    const userUid = req.cookies?.uid;
    if (userUid) {
        const user = verifyToken(userUid);
        console.log(user)
        if (user) {
            req.user = user
            return next();
        } else {
            console.log("Invalid user token")
            return res.status(401).json({msg : "Unauthorized access"})
        }
    } else {
        console.log("No user found")
        return res.status(401).json({msg : "Unauthorized access"})
    }
}

function isLoggedIn(req,res,next){
    console.log(req.cookies)
    const userUid=req.cookies?.uid;
    if(!userUid) {
        console.log("UID not found")
        return res.status(401).json({msg : "Please login to access more content"})
    }
    else{
        const user=verifyToken(userUid);
        if(user) return next();
        else {
            console.log("Invalid token")
            return res.status(401).json({msg : "Unauthorized access"})}
    }
}
module.exports = { checkForAuthentication, isLoggedIn }
