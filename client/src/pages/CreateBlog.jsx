import { useState } from "react";
import { motion } from "framer-motion";
import { Button, MenuItem, TextField } from "@mui/material";
import { SendHorizontal } from "lucide-react";
import { toast } from "react-toastify";

const categories = [
  "Tech", "Health", "Lifestyle", "Education", "Business", "Travel", "Other",
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
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blog/add-new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        setForm({ title: "", content: "", coverPageUrl: "", category: "" });
      } else {
        toast.error("Please login to create blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdeee8] to-[#f9d8c3] px-6 py-20 md:px-24 text-[#4a2e2b]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 max-w-4xl mx-auto w-full"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#6e3b2e]">
          ✍️ Publish a New Blog
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
            InputLabelProps={{ style: { color: "#4a2e2b" } }}
          />

          <TextField
            label="Cover Image URL"
            name="coverPageUrl"
            fullWidth
            required
            variant="outlined"
            value={form.coverPageUrl}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#4a2e2b" } }}
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
            InputLabelProps={{ style: { color: "#4a2e2b" } }}
          />

          <TextField
            label="Category"
            name="category"
            select
            fullWidth
            required
            value={form.category}
            onChange={handleChange}
            InputLabelProps={{ style: { color: "#4a2e2b" } }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex justify-center"
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendHorizontal size={18} />}
              sx={{
                backgroundColor: "#d88f74",
                '&:hover': { backgroundColor: "#c97c60" },
                borderRadius: "10px",
                textTransform: "none",
                px: 4,
                my: 2
              }}
            >
              Publish Blog
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
