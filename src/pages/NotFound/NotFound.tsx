import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NotFound: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Typography
                variant="h2"
                style={{
                    marginBottom: '16px',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#333',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                Oops!
            </Typography>
            <Typography
                variant="body1"
                style={{
                    marginBottom: '32px',
                    fontSize: '24px',
                    color: '#666',
                }}
            >
                The page you're looking for could not be found.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                style={{
                    minWidth: '180px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                }}
            >
                Go Home
            </Button>
        </div>
    );
};

export default NotFound;
