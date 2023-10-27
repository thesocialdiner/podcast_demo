import { useState } from 'react';

const RSSFeedForm = ({ onTranscription }: { onTranscription: (transcription: string) => void }) => {
    const [podcastURL, setPodcastURL] = useState(''); // to manage podcast URL input
    const [loading, setLoading] = useState(false); // to manage loading state
    const [error, setError] = useState<string | null>(null); // to manage errors

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/transcribe', { // assuming your backend endpoint is /api/transcribe
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: podcastURL })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            onTranscription(data.transcription); // passing transcription to parent or another handler
        } catch (error) {
            console.error('Error fetching transcription:', error);
            setError('Failed to fetch transcription. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={podcastURL}
                    onChange={(e) => setPodcastURL(e.target.value)}
                    placeholder="Enter Podcast URL"
                />
                <button type="submit">Transcribe</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default RSSFeedForm;
