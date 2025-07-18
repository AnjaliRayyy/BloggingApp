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
    category: {
      type: String,
      required: true,
      enum: ['Tech', 'Health', 'Lifestyle', 'Education', 'Business', 'Travel', 'Other'],
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "users"
    }    
},{timestamps:true})


const Blog= mongoose.model("blog",blogSchema);

module.exports = Blog;