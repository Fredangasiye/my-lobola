export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, language = 'en' } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return res.status(500).json({ error: 'OpenRouter API key not configured' });
    }

    // Create a culturally appropriate prompt for lobola guidance
    const systemPrompt = `You are Uncle Wisdom, a respected elder from South Africa who provides guidance on lobola (bride price) traditions. You have deep knowledge of various South African cultures including Zulu, Xhosa, Sotho, Tswana, and others.

Your role is to:
1. Provide respectful, culturally sensitive advice about lobola traditions
2. Emphasize the importance of family discussions and elder consultation
3. Explain that lobola is about joining families, not buying a person
4. Offer practical guidance while respecting cultural diversity
5. Always remind people to consult with their own family elders

Respond in a warm, wise, and respectful tone. Keep responses concise but meaningful.`;

    const userPrompt = `Question: ${question}

Please provide guidance on this lobola-related question. Remember to be culturally sensitive and emphasize the importance of family consultation.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://my-lobola.vercel.app',
        'X-Title': 'My Lobola Calculator'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'I apologize, but I am unable to provide guidance at this time. Please consult with your family elders for the best advice.';

    res.status(200).json({ 
      answer,
      question,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Chat API Error:', error);
    res.status(500).json({ 
      error: 'Unable to process your question at this time. Please try again later or consult with your family elders.',
      details: error.message 
    });
  }
} 