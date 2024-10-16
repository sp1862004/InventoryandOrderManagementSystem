import 'animate.css';
import  { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful');
            navigate('/'); 
        } catch (error) {
            console.error(error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <Container component="main" maxWidth="xs" className='mb-5 border mt-5'>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <LockOutlinedIcon sx={{ fontSize: 40 }} />
                <Typography component="h1" variant="h5">Sign In</Typography>
                <form onSubmit={handleSignIn} style={{ width: '100%', marginTop: '1rem' }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
                        Sign In
                    </Button>
                    <Link to={"/signup"} >create new account?</Link>
                </form>
                <div className="text-center mt-4 col-md-12">
                    <img src="l2.jpg" alt="Library" className=" mx-auto animate__animated animate__bounceIn" />
                </div>
            </Box>
        </Container>
    );
};

export default SignIn;
