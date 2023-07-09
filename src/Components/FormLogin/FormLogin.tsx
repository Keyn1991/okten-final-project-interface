import React, { useState } from 'react';

import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link, useNavigate} from 'react-router-dom';
import { login } from '../../service/authService';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await login(email, password);
            const { access_token } = response.data;
            console.log(access_token);

            navigate('/orders');
        } catch (error) {
            console.error('An error occurred');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            color: 'white',
                            '&:hover': {
                                opacity: 0.8,
                            },
                        }}
                    >
                        Sign In
                    </Button>
                    <Typography variant="body2">
                        <Link to="#" onClick={() => console.log('Forgot password clicked')}>
                            Forgot password?
                        </Link>
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '20%',
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    animation: 'adSlideLeft 1s infinite alternate',
                }}
            >
                <Typography variant="body1"><img src="https://kartinkin.net/uploads/posts/2022-02/1645728640_42-kartinkin-net-p-letnie-kartinki-na-telefon-46.jpg" alt="lato"/></Typography>
            </Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '20%',
                    backgroundColor: '#f5f5f5',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    animation: 'adSlideRight 1s infinite alternate',
                }}
            >
                <Typography variant="body1"><img src="https://kartinkin.net/uploads/posts/2022-02/1645728640_42-kartinkin-net-p-letnie-kartinki-na-telefon-46.jpg" alt="lato"/></Typography>
            </Box>
            <style>
                {`
        @keyframes adSlideLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes adSlideRight {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}
            </style>
        </Container>
    );
}

export default LoginForm;
