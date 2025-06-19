import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Container, Grid, Link, Divider } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Recipe AI
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered recipe generator that creates personalized recipes based on ingredients you have and your dietary preferences.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link component={RouterLink} to="/generator" color="inherit" display="block" sx={{ mb: 1 }}>
              Recipe Generator
            </Link>
            <Link component={RouterLink} to="/saved-recipes" color="inherit" display="block" sx={{ mb: 1 }}>
              Saved Recipes
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link component={RouterLink} to="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Recipe AI. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;