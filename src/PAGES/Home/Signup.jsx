import 'animate.css';
import  { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('User signed up successfully');
            navigate('/signin'); 
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user; 
            alert('Google sign-up successful');
            navigate('/'); 
        } catch (error) {
            console.error(error.message);
            alert('Google sign-up failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs" className="animate__animated animate__fadeInDown mt-5 mb-5">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '10px',
                    boxShadow: 3,
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form onSubmit={handleSignUp} style={{ width: '100%', marginTop: '1rem' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
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
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleGoogleSignUp}
                    sx={{ mt: 2 }}
                >
                    Sign Up with Google
                </Button>
                <div className="text-center mt-4">
                    <img src="lock.jpeg" alt="Library" className="w-32 mx-auto animate__animated animate__bounceIn" />
                </div>
            </Box>
        </Container>
    );
};

export default SignUp;
