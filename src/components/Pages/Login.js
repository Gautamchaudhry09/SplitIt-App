import React, { useContext, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { getOccasions, loginUser } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../AppContext/AppContext";
import axios from "axios";

export const Login = () => {
  const { user, setUser, occasions, setOccasions } = useContext(AccountContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await loginUser({ username, password });
    setPassword("");
    if (res) {
      setUser(username);
      await getOcc();
      navigate("/");
    }
  };
  const getOcc = async () => {
    const occRes = await getOccasions({ username });
    console.log("login occRes", occRes);
    setOccasions(occRes);
    console.log("login occasions", occasions);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={5} sx={{ padding: 4, borderRadius: 2, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Login
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
