const jwt = require('jsonwebtoken');

function authenticateToken(user) {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token) {
    console.log("Verify token was called")
    console.log(token)
    try {
        if (!token) return null;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    }
    catch (err) {
        console.log("Error : ", err.message);
        return null;
    }
}

module.exports = { authenticateToken, verifyToken }