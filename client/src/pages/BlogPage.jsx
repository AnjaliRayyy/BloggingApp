import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";

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
        // console.log(data)
        // console.log(data.length)
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
      <BlogList blogs={blogs} />
    </div>
  );
}
