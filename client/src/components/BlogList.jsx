// BlogList.jsx
import React from "react";
import BlogCard from "./BlogCard";

const BlogList = ({ blogs }) => {
  if (blogs.length === 0) {
    console.log("Blogs Length : ",blogs.length)
    return <p className="text-center mt-10 text-gray-500">No blogs found.</p>;
  }

  return (
   <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>)
  ;
};

export default BlogList;
