import { useState } from "react";
import { motion } from "framer-motion";
import { Button, MenuItem, TextField } from "@mui/material";
import { SendHorizontal } from "lucide-react";
import { toast } from "react-toastify";

const categories = [
  "Tech",
  "Health",
  "Lifestyle",
  "Education",
  "Business",
  "Travel",
  "Other",
];

export default function CreateBlog() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    coverPageUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Blog Submitted:", form);

    try {
      const response = await fetch("http://localhost:8000/blog/add-new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          title : form.title,
          content : form.content,
          coverPageUrl : form.coverPageUrl,
          category : form.category,
        }),
      });
      const data = await response.json();
      if(response.ok) 
      {
        toast.success(data.msg);
        setForm({
            title : "",
            content : "",
            coverPageUrl : "",
            category : "",
        })
      }
      else
      {
        toast.error("Please login to create blog");
      }
    } catch (err) {
        console.error(err);
        toast.error(err)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-6 py-20 md:px-24 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto w-full"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-700">
          Write a New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Blog Title"
            name="title"
            fullWidth
            required
            variant="outlined"
            value={form.title}
            onChange={handleChange}
          />

          <TextField
            label="Cover Image URL"
            name="coverPageUrl"
            fullWidth
            required
            variant="outlined"
            value={form.coverPageUrl}
            onChange={handleChange}
          />

          <TextField
            label="Content"
            name="content"
            fullWidth
            required
            multiline
            minRows={6}
            variant="outlined"
            value={form.content}
            onChange={handleChange}
          />

          <TextField
            label="Category"
            name="category"
            select
            fullWidth
            required
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex justify-center"
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendHorizontal size={18} />}
              sx={{ borderRadius: "8px", textTransform: "none", px: 4 }}
            >
              Publish Blog
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
