// AI Wisdom API endpoint - fresh start
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
    console.log('🔑 NEW API - API Key Status:', {
      exists: !!process.env.OPENROUTER_API_KEY,
      length: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.length : 0,
      preview: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.substring(0, 15) + '...' : 'NOT SET'
    });

    // Test OpenRouter API call
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://my-lobola-app.vercel.app',
        'X-Title': 'My Lobola App'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: 'You are Uncle Wisdom, a wise African elder who only provides guidance about lobola (bride price) and African marriage traditions.'
          },
          {
            role: 'user',
            content: `Question: ${question}`
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ OpenRouter API Error:', response.status, errorData);
      
      res.status(200).json({
        answer: "API Error - Status: " + response.status + " - API Key: " + (process.env.OPENROUTER_API_KEY ? "SET" : "NOT SET"),
        source: 'error',
        culturalGroup: culturalGroup || 'general',
        debug: {
          apiKeyExists: !!process.env.OPENROUTER_API_KEY,
          apiKeyLength: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.length : 0,
          errorStatus: response.status,
          errorData: errorData
        }
      });
      return;
    }

    const data = await response.json();
    console.log('✅ OpenRouter API Response:', JSON.stringify(data, null, 2));
    
    let answer = '';
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      answer = data.choices[0].message.content.trim();
    } else {
      answer = "Thank you for your question! As Uncle Wisdom, I remind you that lobola traditions are deeply personal and should be discussed with family elders and cultural advisors.";
    }

    res.status(200).json({
      answer: answer,
      source: 'openrouter-mistral',
      culturalGroup: culturalGroup || 'general',
      model: 'mistralai/mistral-7b-instruct',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Wisdom API Error:', error);
    res.status(200).json({
      answer: "Error occurred: " + error.message,
      source: 'error',
      culturalGroup: culturalGroup || 'general'
    });
  }
} 