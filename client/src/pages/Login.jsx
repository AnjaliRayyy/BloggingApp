import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fcefe8] to-[#e6d0c3] dark:from-[#2a1e1c] dark:to-[#3b2c2a] transition-all">
      <div className="bg-white/30 dark:bg-[#ffffff0a] backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md text-[#4a2e2b] dark:text-[#ffccab] border border-white/20 dark:border-white/10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-[#6d4c41] dark:text-[#ffd8b1]">
            Log in to continue your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-sm text-[#4a2e2b] dark:text-[#ffccab]">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-white/70 dark:bg-[#ffffff0d] text-[#4a2e2b] dark:text-[#ffd8b1] placeholder:text-sm placeholder:text-[#8c6d66] dark:placeholder:text-[#ffcba4] outline-none border border-[#d2b49c] dark:border-[#5a413a] focus:ring-2 focus:ring-[#a47148]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-sm text-[#4a2e2b] dark:text-[#ffccab]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-white/70 dark:bg-[#ffffff0d] text-[#4a2e2b] dark:text-[#ffd8b1] placeholder:text-sm placeholder:text-[#8c6d66] dark:placeholder:text-[#ffcba4] outline-none border border-[#d2b49c] dark:border-[#5a413a] focus:ring-2 focus:ring-[#a47148]"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePassword}
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
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#8e5d3b] hover:underline font-semibold dark:text-[#ffcba4]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
