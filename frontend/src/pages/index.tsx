// Importing required modules and components
import React, { useState } from 'react';
import RSSFeedForm from '../components/RSSFeedForm'; // Assuming this component exists in your structure
import TranscriptionDisplay from '../components/TranscriptionDisplay'; // Assuming this component exists in your structure

// Main functional component
const Home = () => {
  // State to hold the podcast URL submitted by the user
  const [podcastURL, setPodcastURL] = useState('');

  // State to hold the transcription data
  const [transcription, setTranscription] = useState('');

  // State to hold any error message
  const [error, setError] = useState('');

  // Function to fetch transcription from backend
  const fetchTranscription = async () => {
    // Clear any existing errors
    setError('');

    try {
      // Make API request to the backend
      const response = await fetch(`http://backend-url/transcribe?url=${podcastURL}`);
      
      // Check if the request was successful
      if (response.ok) {
        // Parse JSON data
        const data = await response.json();

        // Update the state with the transcription data
        setTranscription(data.transcription);
      } else {
        // If the API returns an error, update the state with the error message
        setError('Failed to fetch transcription. Please try again.');
      }
    } catch (error) {
      // If there's an error in the API call, update the state with the error message
      setError('An error occurred. Please try again.');
    }
  };

  // Function to handle the submission of the RSS feed form
  const handleSubmit = (url: string) => {
    setPodcastURL(url);
    fetchTranscription();
  };

  return (
    <div>
      {/* Render the RSS feed form */}
      <RSSFeedForm onSubmit={handleSubmit} />

      {/* Render the transcription data if available */}
      {transcription && <TranscriptionDisplay data={transcription} />}

      {/* Render error message if any */}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Home;
