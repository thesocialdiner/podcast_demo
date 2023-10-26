// src/pages/api/transcribe.tsx

import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;

    // Check if the URL parameter is provided
    if (!url) {
        return res.status(400).json({ error: 'URL parameter is missing.' });
    }

    try {
        // Make the request to the backend for transcription
        const response = await fetch(`http://127.0.0.1:8000/transcribe?url=${url}`);

        // If the response from the backend isn't 200 OK, throw an error
        if (!response.ok) {
            throw new Error(`Backend responded with a ${response.status}`);
        }

        // If the response is good, parse the JSON and send it to the frontend
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching transcription:', error);
        return res.status(500).json({ error: 'Failed to fetch transcription.' });
    }
}
