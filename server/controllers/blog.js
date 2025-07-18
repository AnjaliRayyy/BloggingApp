const Blog=require('../models/blog')

async function handleNewBlog(req,res) {
    try {
        const { title, content, coverPageUrl, category } = req.body;
        if (!title || !content || !coverPageUrl || !category) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }
        if (!req.user) {
            return res.status(401).json({ msg: "Please login first" });
        }
        const newBlog = new Blog({ title, content, coverPageUrl, category, createdBy: req.user.id });
        await newBlog.save();
        return res.status(201).json({ msg: "Blog created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Failed to create new blog" });
    }
}

module.exports={handleNewBlog}