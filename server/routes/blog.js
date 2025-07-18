const express=require ("express");
const router=express.Router();
const { handleNewBlog } = require("../controllers/blog");
const {checkForAuthentication}=require('../middlewares/auth')


router.post('/add-new',checkForAuthentication,handleNewBlog)

module.exports=router;