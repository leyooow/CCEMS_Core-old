import React from "react";
import { Typography, Button } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
   <>
   <Typography variant="h5" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" textAlign="center" gutterBottom>
          Welcome to the Dashboard! Here you can view your metrics and manage
          your tasks.
        </Typography>
        <Button variant="contained">Learn More</Button>
   </>
        
  )   
};

export default Dashboard;
