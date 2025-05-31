import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                bgcolor: 'background.default',
                textAlign: 'center',
                py: 4,
                px: 2,
                mt: 'auto'
            }}
        >
            <Typography variant="body2" color="text.secondary">
                2024 © Spots
            </Typography>
        </Box>
    );
}

export { Footer };