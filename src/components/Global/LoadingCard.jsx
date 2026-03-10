import React from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";

const LoadingCard = () => {
  return (
    <Container>
      <Box
        sx={{
          minHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: { xs: "90%", sm: "60%", md: "30%" }, // Responsive width
            padding: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              textTransform: "uppercase",
              fontWeight: 300,
              fontFamily: "Roboto Mono, monospace",
              letterSpacing: 1,
              fontSize: "0.9rem",
              color: "text.secondary",
            }}
          >
            Loading data, please wait...
          </Typography>
          <LinearProgress sx={{ width: "100%" }} />
        </Paper>
      </Box>
    </Container>
  );
};

export default LoadingCard;
