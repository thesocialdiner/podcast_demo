import { useState } from 'react';

// Define the prop types for the component.
interface Props {
  onSubmission: (url: string) => void;
}

const RSSFeedForm: React.FC<Props> = ({ onSubmission }) => {
  // State to hold the URL input value.
  const [url, setUrl] = useState('');
  
  // State to hold any input validation error.
  const [error, setError] = useState('');

  // Event handler for the form submission.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the URL input is empty.
    if (!url.trim()) {
      setError('Please enter a valid RSS feed URL.');
      return;
    }
    
    // If the input is valid, clear any existing errors.
    setError('');

    // Call the onSubmission prop function with the URL value.
    onSubmission(url);
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            className="border-2 border-gray-300 p-2 w-full"
            placeholder="Enter RSS feed URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
            Transcribe
          </button>
        </div>
        
        {/* Display error message if there's any */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default RSSFeedForm;
