// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
  Box,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const API_URL = 'http://localhost:5000/api/news';

function App() {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get(API_URL);
        setHeadlines(response.data.articles.slice(0, 5)); // Display 5 headlines
      } catch (err) {
        setError("Failed to load news headlines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHeadlines();
  }, []);

  return (
    <Container maxWidth="md">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Latest News Headlines
        </Typography>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      
      {error && <Alert severity="error">{error}</Alert>}

      {headlines.map((headline, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" component="h2">
              {headline.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              {headline.urlToImage && (
                <CardMedia
                  component="img"
                  height="200"
                  image={headline.urlToImage}
                  alt="news image"
                />
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <strong>Source:</strong> {headline.source.name} | <strong>Published:</strong> {new Date(headline.publishedAt).toLocaleString()}
                </Typography>
                <Typography variant="body1" paragraph mt={2}>
                  {headline.description || "No description available."}
                </Typography>
                <Typography variant="body2" color="primary">
                  <a href={headline.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Read more
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}

export default App;
