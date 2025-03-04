import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import heroImage from '../assets/heroImage.webp'
import { useNavigate } from "react-router-dom";
const HeroComponent: React.FC = () => {

  const navigate=useNavigate()
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 8 }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side: Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Grow Your Learning Opportunities
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Explore high-quality courses from top instructors and start your journey towards success.
            </Typography>
            <Button onClick={()=>navigate('/all-courses')} variant="contained" color="primary" size="large">
              Explore Courses
            </Button>
          </Grid>

          {/* Right Side: Splash Image */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <img
              src={heroImage}
              alt="Student Reading"
              style={{ width: "100%", maxWidth: "450px", borderRadius: 8 }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroComponent;
