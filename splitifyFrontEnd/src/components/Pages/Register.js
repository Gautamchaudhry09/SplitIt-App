import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { registerUser } from "../../service/api";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 4) {
      window.alert("Password must be at least 4 characters long.");
    } else {
      const res = await registerUser({ username, password });
      setPassword("");
      if (res) navigate("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          borderRadius: 2,
          mt: 8,
          backgroundColor: "#000000",
          color: "#FFFFFF",
          border: "2px solid #66CCCC",
          boxShadow: "0px 0px 15px #66CCCC",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: "#FF69B4" }}
        >
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="new-username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              input: { color: "#FFFFFF" },
              label: { color: "#66CCCC" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#66CCCC",
                },
                "&:hover fieldset": {
                  borderColor: "#FF69B4",
                },
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: "#FFFFFF" },
              label: { color: "#66CCCC" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#66CCCC",
                },
                "&:hover fieldset": {
                  borderColor: "#FF69B4",
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#FF69B4",
              "&:hover": {
                bgcolor: "#FF69B4",
                boxShadow: "0 0 10px #FF69B4",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
