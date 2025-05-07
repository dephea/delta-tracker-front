import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import Header from "../Components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';


export default function RegisterPage() {

    const [username, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login: authLogin } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Login:', username, 'Password:', password);

    

    setLoading(true);

    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok) {
            console.log('Register successful:', data);
            authLogin({ login: username }, data.access_token);
            navigate('/');
        } else {
            alert('Register failed: ' + data.message); 
            navigate('/register');
        } 
    } catch (error) {
        console.error('Error during register:', error);
        alert('Register failed: Unable to reach the server. Please try again later.');
    } finally {
        setLoading(false);
    }
    

}

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
              Register
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
                    'Register'
                  )}
              </Button>
            </form>
          </Box>
        </Box> </>
      );
}