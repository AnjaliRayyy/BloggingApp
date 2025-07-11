import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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

      {/* Right Section: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-blue-800 mb-6">
            Welcome Back
          </h2>

          <form className="space-y-5">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
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
              <a href="/signup" className="font-semibold text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
