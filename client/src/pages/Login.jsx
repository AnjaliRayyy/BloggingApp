import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("");
    
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
      });

      const data = await response.json();
      if(response.ok)
      {
        toast.success(data.msg);
        setEmail("");
        setPassword("");
        navigate("/");
      }
      else
      {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.msg);
    }}


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

        {/* Right Section: Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl md:text-2xl font-semibold text-center text-blue-800 mb-6">
              Welcome Back
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                Login
              </Button>
            </form>

            {/* Don't have an account */}
            <div className="mt-4 text-center">
              <p className="text-sm">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Login;
