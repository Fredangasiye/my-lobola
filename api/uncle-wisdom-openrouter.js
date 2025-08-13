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

    // Create culturally-aware prompt for the LLM with strict lobola focus
    const culturalContext = culturalGroup ? 
      `You are Uncle Wisdom, a wise elder from ${culturalGroup} culture. You have deep knowledge of ${culturalGroup} lobola traditions, customs, and cultural values.` :
      'You are Uncle Wisdom, a wise elder with deep knowledge of African lobola traditions, customs, and cultural values.';

    const strictPrompt = `${culturalContext}

IMPORTANT: You can ONLY respond to questions about lobola (bride price), African marriage traditions, cultural marriage customs, and family union practices. If the question is not related to these topics, politely redirect the user to ask about lobola or African marriage traditions.

You are speaking to someone who is seeking guidance about lobola (bride price) traditions. Provide thoughtful, culturally sensitive, and practical advice.

Question: ${question}

Please respond as Uncle Wisdom would - with warmth, wisdom, and cultural understanding. Keep your response under 200 words and focus ONLY on practical guidance related to lobola and African marriage traditions that respects both tradition and modern values.

If the question is not about lobola or African marriage traditions, respond with: "My child, I can only provide wisdom about lobola and African marriage traditions. Please ask me about bride price, cultural marriage customs, or family union practices."`;

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
        model: 'mistralai/mistral-7b-instruct', // Free Mistral model
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
      console.error('OpenRouter API Error:', response.status, errorData);
      
      // Fallback to smart response system if LLM is unavailable
      console.log('OpenRouter service unavailable, using fallback system');
      const generateResponse = (question, culturalGroup) => {
        const questionLower = question.toLowerCase();
        const group = culturalGroup ? culturalGroup.toLowerCase() : 'general';
        
        // Define response patterns based on question content
        const responses = {
          zulu: {
            cattle: "Ah, my child. In Zulu culture, cattle represent wealth and respect. The number of cattle reflects the value placed on the bride's family and her upbringing. Remember, 'umuntu ngumuntu ngabantu' - we are people through other people. Lobola is not a transaction, but a joining of families.",
            negotiation: "My child, in Zulu tradition, patience is key. Like brewing traditional beer, good things take time. Do not rush the negotiations. Let the discussions flow naturally, and always show respect to the elders present. The inkosi yomndeni (head of family) must be consulted.",
            family: "Remember, my child, that modern Zulu families often accept both cattle and money. What matters most is the spirit of the tradition - showing respect, honoring the family, and creating bonds that will last generations.",
            money: "My child, in Zulu culture, while cattle are traditional, many families now accept money as well. The amount should reflect respect for the family and the bride's value. Remember, it's not about the money itself, but the honor and respect it represents.",
            general_question: "Ah, my child. In Zulu culture, lobola is about uniting families through respect and tradition. Remember 'umuntu ngumuntu ngabantu' - we are people through other people. Approach this journey with humility, patience, and respect for all involved.",
            default: "Ah, my child. In Zulu culture, lobola is about uniting families, not buying a person. Remember 'umuntu ngumuntu ngabantu' - we are people through other people. Approach the bride's family with respect, say 'Sawubona baba' and listen more than you speak."
          },
          xhosa: {
            initiation: "In Xhosa culture, both the groom and bride should have completed their initiation rites (ulwaluko for men, intonjane for women) before lobola discussions. This shows respect for cultural traditions and family values.",
            family: "My child, in Xhosa tradition, the amakhaya (home people) must be consulted. This includes extended family members who have wisdom to share. Build relationships with her siblings and cousins too - you're joining her entire family.",
            respect: "Ah, in Xhosa culture, lobola shows serious intentions and respect for the bride's family. It's not about buying a person, but showing that you value her and her family. Remember to say 'Ndicela ukuthetha nawe tata' before beginning discussions.",
            money: "My child, in Xhosa culture, lobola payments can include both cattle and money. The amount should reflect your respect for the family and your commitment. Remember, it's about showing serious intentions, not just financial value.",
            general_question: "My child, in Xhosa culture, lobola is about showing respect and serious intentions. The amakhaya (home people) must be involved, and both families should feel honored by the process. Approach with humility and respect.",
            default: "My child, remember that modern Xhosa families also value education and career achievements alongside traditional cattle payments. The spirit of respect and family unity is what matters most."
          },
          sotho: {
            respect: "In Sesotho culture, respect (tlotlo) is fundamental. Show respect through your words, actions, and the gifts you bring. The entire family must be consulted, not just the immediate family.",
            negotiation: "My child, Sesotho negotiations are unhurried. Take time to build relationships and show genuine interest in the family. Traditional lobola includes both cattle and money (madi) to show respect for both tradition and modern needs.",
            community: "Remember that your marriage affects not just two families, but the entire community. Contemporary Sesotho families appreciate when grooms show understanding of both traditional and modern values.",
            default: "My child, remember that this process should bring families together, not drive them apart. Seek understanding and compromise in all discussions."
          },
          tswana: {
            hospitality: "In Setswana culture, hospitality (botho) is valued. Show respect by accepting food and drink offered during negotiations. The extended family plays a crucial role - include grandparents and family elders in discussions.",
            harmony: "Setswana culture emphasizes harmony (kagisano). Your marriage should bring peace and unity to both families. Modern Setswana families value education and career success - show how you can provide for the family.",
            gifts: "Traditional Setswana lobola includes cattle, blankets, and other gifts, each with cultural significance. Approach with humility and patience - Setswana negotiations are about building lasting relationships.",
            default: "My child, remember that this process should bring families together, not drive them apart. Seek understanding and compromise in all discussions."
          },
          general: {
            tradition: "My child, remember that lobola traditions are deeply personal and should be discussed with family elders and cultural advisors. This process is about bringing families together, not driving them apart.",
            communication: "Keep talking with your partner throughout this process. Make sure you're both comfortable with the arrangements. Communication is key to a successful marriage.",
            family: "Include both families in the process. This creates unity and shows respect for everyone involved. Many families blend traditional and modern approaches.",
            money: "My child, lobola is not about money alone. While financial considerations are important, the true value lies in showing respect, honoring traditions, and creating bonds between families. Discuss openly with both families about what works best for everyone.",
            general_question: "My child, lobola is a beautiful tradition that unites families. The key is to approach it with respect, patience, and open communication. Remember that every family and situation is unique, so be flexible and understanding throughout the process.",
            default: "My child, lobola is about honoring traditions while building bridges between families. Approach this journey with respect, patience, and love. Remember that the goal is to unite families, not create divisions."
          }
        };

        // Determine the best response based on question content
        let category = 'default';
        if (questionLower.includes('cattle') || questionLower.includes('cow') || questionLower.includes('livestock') || questionLower.includes('animal') || questionLower.includes('how many')) {
          category = 'cattle';
        } else if (questionLower.includes('negotiate') || questionLower.includes('discuss') || questionLower.includes('talk') || questionLower.includes('approach') || questionLower.includes('start')) {
          category = 'negotiation';
        } else if (questionLower.includes('family') || questionLower.includes('parent') || questionLower.includes('elder') || questionLower.includes('uncle') || questionLower.includes('aunt') || questionLower.includes('sibling')) {
          category = 'family';
        } else if (questionLower.includes('respect') || questionLower.includes('honor') || questionLower.includes('value') || questionLower.includes('important') || questionLower.includes('show')) {
          category = 'respect';
        } else if (questionLower.includes('initiation') || questionLower.includes('rite') || questionLower.includes('ceremony') || questionLower.includes('ulwaluko') || questionLower.includes('intonjane')) {
          category = 'initiation';
        } else if (questionLower.includes('hospitality') || questionLower.includes('food') || questionLower.includes('drink') || questionLower.includes('accept') || questionLower.includes('offer')) {
          category = 'hospitality';
        } else if (questionLower.includes('harmony') || questionLower.includes('peace') || questionLower.includes('unity') || questionLower.includes('together') || questionLower.includes('unite')) {
          category = 'harmony';
        } else if (questionLower.includes('gift') || questionLower.includes('present') || questionLower.includes('blanket') || questionLower.includes('bring') || questionLower.includes('give')) {
          category = 'gifts';
        } else if (questionLower.includes('tradition') || questionLower.includes('custom') || questionLower.includes('culture') || questionLower.includes('traditional') || questionLower.includes('modern')) {
          category = 'tradition';
        } else if (questionLower.includes('communicate') || questionLower.includes('talk') || questionLower.includes('discuss') || questionLower.includes('partner') || questionLower.includes('relationship')) {
          category = 'communication';
        } else if (questionLower.includes('money') || questionLower.includes('payment') || questionLower.includes('cost') || questionLower.includes('price') || questionLower.includes('pay')) {
          category = 'money';
        } else if (questionLower.includes('what') || questionLower.includes('how') || questionLower.includes('why') || questionLower.includes('when') || questionLower.includes('where')) {
          category = 'general_question';
        }

        // Get the appropriate response
        const groupResponses = responses[group] || responses.general;
        return groupResponses[category] || groupResponses.default;
      };

      // Generate fallback response
      const fallbackAnswer = generateResponse(question, culturalGroup);
      
      res.status(200).json({
        answer: fallbackAnswer,
        source: 'fallback',
        culturalGroup: culturalGroup || 'general'
      });
      return;
    }

    const data = await response.json();
    console.log('OpenRouter API Response:', data);
    
    // Extract the generated text from the response
    let answer = '';
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      answer = data.choices[0].message.content.trim();
    } else {
      // Fallback if response format is unexpected
      console.log('Unexpected response format, using fallback');
      answer = "Thank you for your question! As Uncle Wisdom, I remind you that lobola traditions are deeply personal and should be discussed with family elders and cultural advisors. This tool is meant to start conversations, not replace them.";
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