
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { rssUrl } = req.body;

    // Call your Modal YOUR_MODAL_BACKEND_ENDPOINT backend endpoint here (adjust the URL as needed)currently the fetch will be local
    const modalResponse = await fetch('http://127.0.0.1:8000/transcribe?url=${url}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rssUrl })
    });

    const data = await modalResponse.json();
    
    // Return the transcription data
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
