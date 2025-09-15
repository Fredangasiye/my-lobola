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

    // Force cache refresh
    console.log('🔄 CACHE BUST - ' + new Date().toISOString());

    // Enhanced wisdom system - provides excellent responses
    console.log('🔄 Using enhanced Uncle Wisdom system');
    const generateResponse = (question, culturalGroup) => {
      const questionLower = question.toLowerCase();
      const group = culturalGroup ? culturalGroup.toLowerCase() : 'general';
      
      // Define response patterns based on question content
      const responses = {
        // Greetings and introductions
        greetings: {
          hi: "Sawubona, my child! I am Uncle Wisdom, a guide for lobola traditions. How may I help you with your questions about African marriage customs?",
          hello: "Sawubona, my child! I am Uncle Wisdom, here to share wisdom about lobola and African marriage traditions. What would you like to know?",
          hey: "Sawubona! I am Uncle Wisdom, your guide to understanding lobola traditions. How can I assist you today?",
          who_are_you: "I am Uncle Wisdom, a wise elder who shares knowledge about African lobola traditions and marriage customs. I am here to guide you with cultural wisdom.",
          whats_your_name: "I am Uncle Wisdom, my child. I am here to share the wisdom of African marriage traditions and help you understand lobola customs.",
          are_you_black: "I am Uncle Wisdom, representing the wisdom of African elders and cultural traditions. My role is to guide you in understanding lobola and African marriage customs, regardless of your background.",
          are_you_ai: "I am Uncle Wisdom, a cultural guide designed to share African marriage wisdom. Whether I am AI or not, the wisdom I share comes from deep understanding of African traditions and cultural values.",
          what_can_you_do: "I can help you understand lobola traditions, African marriage customs, cultural practices, and provide guidance on how to approach these important family matters with respect and wisdom.",
          help: "I am here to help you understand lobola traditions and African marriage customs. Ask me about cattle, negotiations, family involvement, cultural practices, or any aspect of traditional African marriage.",
          thanks: "You are welcome, my child. May your journey with lobola traditions be filled with wisdom and respect. Remember to always consult with family elders for personalized guidance.",
          thank_you: "You are most welcome, my child. May the wisdom of our ancestors guide you in your lobola journey. Always approach with humility and respect.",
          bye: "Go well, my child. May the wisdom I've shared help you on your journey. Remember to consult with family elders for your specific situation.",
          goodbye: "Go well, my child. May your lobola journey be blessed with understanding and respect for our traditions.",
          default: "Sawubona, my child! I am Uncle Wisdom, here to guide you in understanding African lobola traditions and marriage customs. How may I help you?"
        },
        
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
      let responseGroup = 'general';
      
      // Check for greetings and general questions first
      if (questionLower.includes('hi') || questionLower.includes('hello') || questionLower.includes('hey')) {
        responseGroup = 'greetings';
        category = 'hi';
      } else if (questionLower.includes('who are you') || questionLower.includes('whats your name') || questionLower.includes('what is your name')) {
        responseGroup = 'greetings';
        category = 'who_are_you';
      } else if (questionLower.includes('are you black') || questionLower.includes('are you ai') || questionLower.includes('are you artificial')) {
        responseGroup = 'greetings';
        category = 'are_you_black';
      } else if (questionLower.includes('what can you do') || questionLower.includes('help') || questionLower.includes('how can you help')) {
        responseGroup = 'greetings';
        category = 'what_can_you_do';
      } else if (questionLower.includes('thank') || questionLower.includes('thanks')) {
        responseGroup = 'greetings';
        category = 'thanks';
      } else if (questionLower.includes('bye') || questionLower.includes('goodbye')) {
        responseGroup = 'greetings';
        category = 'bye';
      } else if (questionLower.includes('cattle') || questionLower.includes('cow') || questionLower.includes('livestock')) {
        category = 'cattle';
      } else if (questionLower.includes('negotiate') || questionLower.includes('discuss') || questionLower.includes('talk')) {
        category = 'negotiation';
      } else if (questionLower.includes('family') || questionLower.includes('parent') || questionLower.includes('elder')) {
        category = 'family';
      } else if (questionLower.includes('respect') || questionLower.includes('honor') || questionLower.includes('value')) {
        category = 'respect';
      } else if (questionLower.includes('initiation') || questionLower.includes('rite') || questionLower.includes('ceremony')) {
        category = 'initiation';
      } else if (questionLower.includes('money') || questionLower.includes('payment') || questionLower.includes('cost')) {
        category = 'money';
      } else if (questionLower.includes('what') || questionLower.includes('how') || questionLower.includes('why')) {
        category = 'general_question';
      }

      // Get the appropriate response
      const groupResponses = responses[responseGroup] || responses.general;
      return groupResponses[category] || groupResponses.default;
    };

    // Generate wisdom response
    const wisdomAnswer = generateResponse(question, culturalGroup);
    
    res.status(200).json({
      answer: wisdomAnswer,
      source: 'enhanced-wisdom',
      culturalGroup: culturalGroup || 'general',
      note: 'Powered by Uncle Wisdom - Cultural guidance system'
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 