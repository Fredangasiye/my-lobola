// Uncle Wisdom API endpoint
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { question, culturalGroup } = req.body;

    if (!question || !question.trim()) {
      res.status(400).json({ error: 'Question is required' });
      return;
    }

    // Debug environment variable
    console.log('🔑 API Key Status:', {
      exists: !!process.env.OPENROUTER_API_KEY,
      length: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.length : 0,
      preview: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.substring(0, 15) + '...' : 'NOT SET'
    });

    // For now, return a test response to see if the endpoint works
    res.status(200).json({
      answer: "FRESH DEPLOY TEST - API endpoint is working! API Key: " + (process.env.OPENROUTER_API_KEY ? "SET" : "NOT SET"),
      source: 'fresh-test',
      culturalGroup: culturalGroup || 'general',
      debug: {
        apiKeyExists: !!process.env.OPENROUTER_API_KEY,
        apiKeyLength: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.length : 0,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 