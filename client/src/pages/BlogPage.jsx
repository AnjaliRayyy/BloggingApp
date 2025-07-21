import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

export default function BlogPage() {
  const { category } = useParams();
  console.log(category)
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:8000/blog?category=${category}`);
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, [category]);

  return (
    <div className="pt-20 min-h-screen">
      <h2 className="text-center text-2xl font-bold mb-6">
        Showing blogs in: {category || "All"}
      </h2>
      {/* <BlogList blogs={blogs} /> */}
      {
        blogs.length > 0 ? (
         <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
               {blogs.map((blog) => (
                 <BlogCard key={blog._id} blog={blog} />
               ))}
             </div>
          ) : (
            <p className="text-center mt-10 text-gray-500">
              No blogs found.
              </p>
              )
      }
    </div>
  );
}
