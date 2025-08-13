// Simple test for OpenRouter + Mistral integration
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function testSimple() {
  console.log('🧪 Simple OpenRouter + Mistral Test\n');
  
  // Check API key
  if (!process.env.OPENROUTER_API_KEY) {
    console.log('❌ OPENROUTER_API_KEY not found. Please add it to your .env file');
    return;
  }
  
  console.log('✅ API key found');
  
  // Test a simple lobola question
  const testQuestion = {
    question: "What is lobola and why is it important in African culture?",
    culturalGroup: "Zulu"
  };
  
  console.log(`\n📝 Testing: "${testQuestion.question}"`);
  
  try {
    const response = await fetch('http://localhost:3000/api/uncle-wisdom-openrouter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testQuestion)
    });

    const data = await response.json();
    
    if (response.status === 200 && data.answer) {
      console.log('✅ SUCCESS: Received response from OpenRouter + Mistral');
      console.log(`   Source: ${data.source}`);
      console.log(`   Model: ${data.model || 'N/A'}`);
      console.log(`   Answer: ${data.answer}`);
      
      // Check if response is lobola-related
      const lobolaKeywords = ['lobola', 'bride', 'marriage', 'african', 'culture', 'tradition'];
      const answerLower = data.answer.toLowerCase();
      const isLobolaRelated = lobolaKeywords.some(keyword => answerLower.includes(keyword));
      
      if (isLobolaRelated) {
        console.log('✅ SUCCESS: Response is lobola-related');
      } else {
        console.log('⚠️  WARNING: Response may not be lobola-related');
      }
    } else {
      console.log('❌ FAILED: Invalid response');
      console.log(`   Status: ${response.status}`);
      console.log(`   Response: ${JSON.stringify(data, null, 2)}`);
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    console.log('Make sure your server is running on localhost:3000');
  }
}

testSimple().catch(console.error); 