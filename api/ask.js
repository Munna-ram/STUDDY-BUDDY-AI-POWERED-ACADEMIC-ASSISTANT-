import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Enable CORS headers so your frontend can communicate with the API
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Initialize the Google Gen AI SDK with your Vercel environment variable
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Call the model (using gemini-2.5-flash)
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return res.status(200).json({ text: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
