import { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Avatar,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!username || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          profileImageURL: profilePic,
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        toast.success(data.msg);
        setUsername("");
        setEmail("");
        setPassword("");
        setProfilePic(null);
      } else {
        toast.error(data.msg || "Failed to register user.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
   <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-100 to-white">
      {/* Left Section: Logo */}
      <div className="w-full md:w-1/2 bg-blue-600 flex items-center justify-center p-10">
        <div className="text-white text-center">
          <img
            src="/logo.png"
            alt="Organization Logo"
            className="mx-auto mb-6 w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg"
          />
          <h1 className="text-2xl md:text-3xl font-bold">Academic Chain</h1>
          <p className="mt-2 text-sm md:text-base text-blue-100">
            Empowering Future Minds
          </p>
        </div>
      </div>

      {/* Right Section: Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-blue-800 mb-6">
            Create an Account
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Profile Picture Upload */}
            <div className="flex items-center space-x-4 mb-6">
              <Avatar
                src={profilePic}
                alt="Profile"
                sx={{ width: 56, height: 56 }}
              />
              <input
                accept="image/*"
                type="file"
                onChange={handleProfilePicChange}
                className="text-sm"
              />
            </div>

          <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#2563eb",
                ":hover": { backgroundColor: "#1d4ed8" },
                py: 1.5,
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Button>
          </form>

          
          
          {/* Already have an account section */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
