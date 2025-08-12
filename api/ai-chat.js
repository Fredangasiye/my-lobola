export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, language = 'en' } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY;
    if (!huggingFaceApiKey) {
      return res.status(500).json({ error: 'Hugging Face API key not configured' });
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

    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `<s>[INST] ${systemPrompt}\n\n${userPrompt} [/INST]`
      })
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data[0]?.generated_text || 'I apologize, but I am unable to provide guidance at this time. Please consult with your family elders for the best advice.';

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
