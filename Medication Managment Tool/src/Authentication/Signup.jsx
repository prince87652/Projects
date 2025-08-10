import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "./AuthService";
import { setUser } from "./authSlice";

const Signup = () => {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const newUser = await signupUser(
        signUpForm.name,
        signUpForm.email,
        signUpForm.password
      );

      dispatch(setUser(newUser));

      navigate("/navbar"); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Box
        maxWidth={400}
        mx="auto"
        mt={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: "400" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            color="text.secondary"
          >
            Create Account
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
              label="FullName"
              type="text"
              name="name"
              value={signUpForm.name}
              onChange={handleChange}
            />
            <TextField
              type="email"
              label="Email"
              name="email"
              value={signUpForm.email}
              onChange={handleChange}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={signUpForm.password}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">
              SignUp
            </Button>
          </Box>
          <Typography mt={1}>
            Already have an account?{" "}
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Signup;
