const mongoose=require('mongoose')

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
        },
    coverPageUrl : {
        type : String,
        required : true,
        default : "abcd",
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref: "user"
    }    
},{timestamps:true})


const Blog= mongoose.model("blog",blogSchema);

module.exports = Blog;