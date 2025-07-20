const express=require ("express");
const router=express.Router();
const { handleNewBlog, fetchBlogByCategory } = require("../controllers/blog");
const {checkForAuthentication}=require('../middlewares/auth')


router.post('/add-new',checkForAuthentication,handleNewBlog)
router.get('/',fetchBlogByCategory)

module.exports=router;