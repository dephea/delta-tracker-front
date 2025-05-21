import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); 
  const { user: authUser, token: authToken} = useAuth();

  const [username, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (authUser || authToken) {
    console.log('User is already logged in:', authLogin);
    navigate('/');
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Login:', username, 'Password:', password);
    

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
      if (res.ok) {
        console.log('Login successful:', data);
        authLogin({ login: username }, data.access_token);
        navigate('/');
      } else {
        alert('Login failed: ' + data.message); 
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed: Unable to reach the server. Please try again later.');
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
    <Header />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          width: 300,
        }}
      >
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Login"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={loading}
          >
            {loading ? (
                <CircularProgress size={24} sx={{ color: 'green' }} />
              ) : (
                'Authorize'
              )}
          </Button>
        </form>
      </Box>
    </Box> </>
  );
}
