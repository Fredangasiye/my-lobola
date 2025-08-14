// Uncle Wisdom API endpoint with OpenRouter + Mistral LLM integration
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

    // Validate that the question is related to lobola
    const lobolaKeywords = [
      'lobola', 'bride price', 'bridewealth', 'dowry', 'marriage payment',
      'cattle', 'negotiation', 'family meeting', 'traditional marriage',
      'cultural marriage', 'marriage customs', 'family union', 'marriage traditions',
      'zulu', 'xhosa', 'sotho', 'tswana', 'venda', 'pedi', 'swazi', 'ndebele',
      'african marriage', 'traditional wedding', 'family consultation',
      'marriage discussion', 'family respect', 'cultural values'
    ];

    const questionLower = question.toLowerCase();
    const isLobolaRelated = lobolaKeywords.some(keyword => 
      questionLower.includes(keyword)
    );

    if (!isLobolaRelated) {
      res.status(400).json({ 
        error: 'This question is not related to lobola or African marriage traditions. Please ask a question about lobola, bride price, or African marriage customs.' 
      });
      return;
    }

    // Create culturally-aware prompt for the LLM
    const culturalContext = culturalGroup ? 
      `You are Uncle Wisdom, a wise elder from ${culturalGroup} culture. You have deep knowledge of ${culturalGroup} lobola traditions, customs, and cultural values.` :
      'You are Uncle Wisdom, a wise elder with deep knowledge of African lobola traditions, customs, and cultural values.';

    const strictPrompt = `${culturalContext}

IMPORTANT: You can ONLY respond to questions about lobola (bride price), African marriage traditions, cultural marriage customs, and family union practices. If the question is not related to these topics, politely redirect the user to ask about lobola or African marriage traditions.

You are speaking to someone who is seeking guidance about lobola (bride price) traditions. Provide thoughtful, culturally sensitive, and practical advice.

Question: ${question}

Please respond as Uncle Wisdom would - with warmth, wisdom, and cultural understanding. Keep your response under 200 words and focus ONLY on practical guidance related to lobola and African marriage traditions that respects both tradition and modern values.`;

    // Debug API key status
    console.log('🔑 API Key Check:', {
      exists: !!process.env.OPENROUTER_API_KEY,
      length: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.length : 0,
      preview: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.substring(0, 15) + '...' : 'NOT SET'
    });

    // Use OpenRouter with Mistral model
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
            content: 'You are Uncle Wisdom, a wise African elder who only provides guidance about lobola (bride price) and African marriage traditions. You cannot and will not respond to questions outside this scope.'
          },
          {
            role: 'user',
            content: strictPrompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ OpenRouter API Error:', response.status, errorData);
      
      // Return debug info
      res.status(200).json({
        answer: "Debug mode - API Key Status: " + (process.env.OPENROUTER_API_KEY ? "SET" : "NOT SET"),
        source: 'debug',
        culturalGroup: culturalGroup || 'general',
        debug: {
          apiKeyExists: !!process.env.OPENROUTER_API_KEY,
          apiKeyLength: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.length : 0,
          apiKeyPreview: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.substring(0, 15) + '...' : 'NOT SET',
          errorStatus: response.status,
          errorData: errorData
        }
      });
      return;
    }

    const data = await response.json();
    console.log('✅ OpenRouter API Response:', JSON.stringify(data, null, 2));
    
    // Extract the generated text from the response
    let answer = '';
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      answer = data.choices[0].message.content.trim();
      console.log('✅ Extracted answer:', answer);
    } else {
      console.log('❌ No valid answer in response structure:', data);
      answer = "Thank you for your question! As Uncle Wisdom, I remind you that lobola traditions are deeply personal and should be discussed with family elders and cultural advisors.";
    }

    // Additional validation to ensure response is lobola-related
    const answerLower = answer.toLowerCase();
    const isAnswerLobolaRelated = lobolaKeywords.some(keyword => 
      answerLower.includes(keyword)
    );

    if (!isAnswerLobolaRelated) {
      answer = "My child, I can only provide wisdom about lobola and African marriage traditions. Please ask me about bride price, cultural marriage customs, or family union practices.";
    }

    res.status(200).json({
      answer: answer,
      source: 'openrouter-mistral',
      culturalGroup: culturalGroup || 'general',
      model: 'mistralai/mistral-7b-instruct'
    });

  } catch (error) {
    console.error('Uncle Wisdom OpenRouter API Error:', error);
    
    // Fallback response on error
    res.status(200).json({
      answer: "Thank you for your question! As Uncle Wisdom, I remind you that lobola traditions are deeply personal and should be discussed with family elders and cultural advisors. This tool is meant to start conversations, not replace them.",
      source: 'error-fallback',
      culturalGroup: culturalGroup || 'general'
    });
  }
} 