import { useState } from "react";
import { Eye, EyeOff, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          profileImageURL: profilePic,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        setUsername("");
        setEmail("");
        setPassword("");
        setProfilePic(null);
        navigate("/login");
      } else {
        toast.error(data.msg || "Failed to register user.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fcefe8] to-[#e6d0c3] dark:from-[#2a1e1c] dark:to-[#3b2c2a] transition-all">
      <div className="bg-white/30 dark:bg-[#ffffff0a] backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md text-[#4a2e2b] dark:text-[#ffccab] border border-white/20 dark:border-white/10">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {/* Profile Pic Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#a47148] dark:border-[#ffcba4] shadow-lg">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/40 dark:bg-[#ffffff0d] text-[#a47148] dark:text-[#ffcba4]">
                <Upload />
              </div>
            )}
          </div>
          <label className="mt-2 text-sm font-medium cursor-pointer text-[#8e5d3b] dark:text-[#ffd8b1]">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
            Upload Profile Picture
          </label>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/70 dark:bg-[#ffffff0d] text-[#4a2e2b] dark:text-[#ffd8b1] placeholder:text-sm placeholder:text-[#8c6d66] dark:placeholder:text-[#ffcba4] outline-none border border-[#d2b49c] dark:border-[#5a413a] focus:ring-2 focus:ring-[#a47148]"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/70 dark:bg-[#ffffff0d] text-[#4a2e2b] dark:text-[#ffd8b1] placeholder:text-sm placeholder:text-[#8c6d66] dark:placeholder:text-[#ffcba4] outline-none border border-[#d2b49c] dark:border-[#5a413a] focus:ring-2 focus:ring-[#a47148]"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 pr-10 rounded-lg bg-white/70 dark:bg-[#ffffff0d] text-[#4a2e2b] dark:text-[#ffd8b1] placeholder:text-sm placeholder:text-[#8c6d66] dark:placeholder:text-[#ffcba4] outline-none border border-[#d2b49c] dark:border-[#5a413a] focus:ring-2 focus:ring-[#a47148]"
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8e5d3b] dark:text-[#ffcba4]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#a47148] hover:bg-[#8e5d3b] text-white py-2 rounded-lg font-semibold transition-all"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#8e5d3b] hover:underline font-semibold dark:text-[#ffcba4]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
