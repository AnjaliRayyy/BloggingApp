const express=require('express');
const router=express.Router();
const {createNewUser, handleUserLogin}=require('../controllers/user.js')


//<-----------SignUp Route-------------->
router.route('/signup').post(createNewUser)

//<------------Login Route-------------->
router.route('/login').post(handleUserLogin)


module.exports=router;