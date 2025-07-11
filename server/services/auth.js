const jwt=require('jsonwebtoken');

function authenticateToken(user){
    const payload={
        id :user._id,
        username : user.username,
        email : user.email,
        role : user.role
    }
    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn : '1h'});
}

function vertifyToken(token){
    try{
        if(!token) return null;
        return jwt.verify(token,process.env.SECRET_KEY,function(err){
            if(err){
                console.log("Error : ",err.message);
            }
        });
    }
    catch(err){
        return null;
    }
}

module.exports={authenticateToken , vertifyToken }