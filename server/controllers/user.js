const User = require('../models/user.js')
const {authenticateToken}=require('../services/auth.js')
async function createNewUser(req, res) {
    try {
        const { username, email, password, profileImageURL } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }
        else{
            const user=await User.find({email})
            console.log(user)
            if(user.email) return res.status(400).json({ msg: "Account already exists, please login" })
            const newUser = new User({ username, email, password, profileImageURL });
            await newUser.save();
            res.json({ msg: "User registered successfully" })
        }
    }
    catch (err) {
        res.json({ msg: "Error in registering user", err: err.message })
    }
}

async function handleUserLogin(req,res){
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){  res.status(404).json({msg:"User not found, please signup"})}
        const isValidPassword=await user.comparePassword(password);
        if(!isValidPassword){res.status(401).json({msg:"Invalid credentials"})}
        const token=await authenticateToken(user);
        res.cookie("uid",token,{ httpOnly: true,       // not accessible via JS
  secure: true,         // only send over HTTPS (must be true in prod)
  sameSite: "none",     // allows cross-site cookies
  maxAge: 24 * 60 * 60 * 1000 // 1 day
   });
        // res.set('uid', token);
        res.json({msg:"User logged in successfully",token})
    }
    catch(err){
        res.status(500).json({msg : "Error in logging in user", err: err.message})
    }
}
module.exports = { createNewUser, handleUserLogin }