"use client"
// Footer.jsx (React component)
import React from 'react';
import styles from './Footer.module.css'; // Import CSS Modules
import { Container, Typography, Link, Box, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}> {/* Apply styles */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h5" gutterBottom>About</Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover">Contact Us</Link><br />
              <Link href="#" color="inherit" underline="hover">About Us</Link><br />
              {/* ... other About links */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h5" gutterBottom>Group Companies</Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover">Myntra</Link><br />
              <Link href="#" color="inherit" underline="hover">Flipkart Wholesale</Link><br />
              {/* ... other Group Companies links */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h5" gutterBottom>Help</Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover">Payments</Link><br />
              <Link href="#" color="inherit" underline="hover">Shipping</Link><br />
              {/* ... other Help links */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h5" gutterBottom>Consumer Policy</Typography>
            <Box>
              <Link href="#" color="inherit" underline="hover">Cancellation & Returns</Link><br />
              <Link href="#" color="inherit" underline="hover">Terms of Use</Link><br />
              {/* ... other Consumer Policy links */}
            </Box>
          </Grid>
          {/* ... other Grid items (if needed) */}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, pt: 2, borderTop: '1px solid #eee' }}>
            <Typography variant="body2" color="text.secondary">
                © {currentYear} Company, Inc. All rights reserved.
            </Typography>
            <Box>
                <IconButton aria-label="twitter" href="#" color="inherit">
                    <TwitterIcon />
                </IconButton>
                <IconButton aria-label="instagram" href="#" color="inherit">
                    <InstagramIcon />
                </IconButton>
                <IconButton aria-label="facebook" href="#" color="inherit">
                    <FacebookIcon />
                </IconButton>
            </Box>
        </Box>

      </Container>
    </footer>
  );
};

export default Footer;
