const Blog=require('../models/blog')
const slugify=require('slugify')
//Logic for creating new blogs
async function handleNewBlog(req,res) {
    const { title, content, coverPageUrl, category } = req.body;
    if (!title || !content || !coverPageUrl || !category) {
        return res.status(400).json({ msg: "Please fill all the fields" });
    }
    if (!req.user) {
        return res.status(401).json({ msg: "Please login first" });
    }

    const slugBase = slugify(title, {lower : true, strict : true})
    const slug=`${slugBase}-${Date.now()}`
    console.log(slug)
    try {
        const newBlog = new Blog({ title, content, coverPageUrl, category, createdBy: req.user.id, slug: slug });
        await newBlog.save();
        return res.status(201).json({ msg: "Blog created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Failed to create new blog" });
    }
}


//Logic for fetching blogs by category
async function fetchBlogByCategory(req,res){
    const {category}=req.query
    if(!category) return res.status(400).json({msg:"Please provide category"})
    try
    {
        const blogs=await Blog.find({category:category})
        if(!blogs.length) return res.status(404).json({msg:"No blogs found for this category"})
        return res.status(200).json(blogs)
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({msg:"Failed to fetch blogs"})
    }
}

//Logic for fetching blogs by slug
async function fetchBlogBySlug(req,res){
    const {slug}=req.params;
    try{
        const blog=await Blog.findOne({slug:slug}).populate("createdBy")
        if(!blog) return res.status(404).json({msg : "Blog not found"})
        else   return res.status(200).json(blog)
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({msg : "Internal Server Error"})
    }
}

// Logic for saving comments
async function handleNewComment (req, res){
  const { slug } = req.params;
  const { name, comment } = req.body;

  try {
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ msg: "Blog not found" });

    blog.comments.push({ name, comment });
    await blog.save();

    res.status(201).json({ msg: "Comment added successfully", blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports={handleNewBlog, fetchBlogByCategory, fetchBlogBySlug, handleNewComment}