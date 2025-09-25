const express=require ("express");
const router=express.Router();
const { handleNewBlog, fetchBlogByCategory, fetchBlogBySlug, handleNewComment } = require("../controllers/blog");
const {checkForAuthentication, isLoggedIn}=require('../middlewares/auth')


router.post('/add-new',checkForAuthentication,handleNewBlog)
router.get('/',fetchBlogByCategory)
router.get('/:slug',isLoggedIn,fetchBlogBySlug)
// router.post("/:slug/comment", handleNewComment);


module.exports=router;