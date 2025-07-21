const express=require ("express");
const router=express.Router();
const { handleNewBlog, fetchBlogByCategory, fetchBlogBySlug } = require("../controllers/blog");
const {checkForAuthentication}=require('../middlewares/auth')


router.post('/add-new',checkForAuthentication,handleNewBlog)
router.get('/',fetchBlogByCategory)
router.get('/:slug',fetchBlogBySlug)

module.exports=router;