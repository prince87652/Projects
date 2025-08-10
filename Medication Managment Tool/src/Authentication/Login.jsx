import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./AuthService";
import { setUser } from "./authSlice";

const Login = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      console.log(
        "Attempting login with:",
        loginForm.email,
        loginForm.password
      );
      const user = await loginUser(loginForm.email, loginForm.password);
      console.log("loginUser result:", user);
      if (!user) {
        setError("Login failed: No user returned.");
        return;
      }
      dispatch(
        setUser({
          email: user.email,
          name: user.displayName,
          uid: user.uid,
        })
      );
      navigate("/navbar");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed");
    }
  };

  return (
    <Box
      mt={12}
      maxWidth={400}
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mx="auto"
    >
      <Paper elevation={3} sx={{ width: "100%", maxWidth: "400", p: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="green" mb={2}>
          Welcome 🎇
        </Typography>
        {error && (
          <Typography color="error" mb={1}>
            {error}
          </Typography>
        )}
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>

        <Typography mt={1}>
          Don’t have an account?{" "}
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
