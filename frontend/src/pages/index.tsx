import { useState } from 'react';
import RSSFeedForm from '../components/RSSFeedForm';
import TranscriptionDisplay from '../components/TranscriptionDisplay';
import Layout from '../components/layout';

const HomePage = () => {
    const [transcription, setTranscription] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fetchTranscription = async (url: string) => {
        try {
            const response = await fetch(`/api/transcribe?url=${url}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTranscription(data.transcription);
        } catch (error) {
            console.error('There was a problem fetching the transcription:', error);
            setError('There was a problem fetching the transcription. Please try again later.');
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">Podcast Transcription</h1>
            <RSSFeedForm onSubmission={fetchTranscription} />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <TranscriptionDisplay transcription={transcription} />
        </Layout>
    );
};

export default HomePage;
