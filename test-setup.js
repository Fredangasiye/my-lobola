// Setup and test script for OpenRouter integration
import fetch from 'node-fetch';

console.log('🚀 OpenRouter + Mistral Integration Setup Test\n');

// Check if we're in a test environment
const isTestMode = process.env.NODE_ENV === 'test' || process.argv.includes('--test');

if (!isTestMode) {
  console.log('📋 Setup Instructions:');
  console.log('1. Get your free API key from https://openrouter.ai');
  console.log('2. Create a .env file in the project root with:');
  console.log('   OPENROUTER_API_KEY=your_api_key_here');
  console.log('3. Run this script with: node test-setup.js --test');
  console.log('\n🔑 Current API Key Status:');
  
  if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'your_openrouter_api_key_here') {
    console.log('✅ API key is configured');
  } else {
    console.log('❌ API key not configured or using placeholder');
    console.log('Please set OPENROUTER_API_KEY in your .env file');
  }
  
  console.log('\n📖 For detailed setup instructions, see OPENROUTER_SETUP.md');
  process.exit(0);
}

// Test mode - actually test the integration
async function testIntegration() {
  console.log('🧪 Testing OpenRouter Integration...\n');
  
  // Check API key
  if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
    console.log('❌ Please set a valid OPENROUTER_API_KEY in your .env file');
    console.log('Get your free key from: https://openrouter.ai');
    return;
  }
  
  console.log('✅ API key found');
  
  // Test OpenRouter connectivity directly
  console.log('\n🌐 Testing OpenRouter connectivity...');
  try {
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
            content: 'What is lobola?'
          }
        ],
        max_tokens: 100
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ OpenRouter API is working!');
      console.log(`   Model: ${data.model || 'N/A'}`);
      console.log(`   Response: ${data.choices[0]?.message?.content || 'No content'}`);
      console.log(`   Usage: ${JSON.stringify(data.usage || 'N/A')}`);
    } else {
      const errorText = await response.text();
      console.log(`❌ OpenRouter API error: ${response.status}`);
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log(`❌ Connection error: ${error.message}`);
  }
  
  // Test the local API endpoint (if server is running)
  console.log('\n🏠 Testing local API endpoint...');
  try {
    const response = await fetch('http://localhost:3000/api/uncle-wisdom-openrouter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: "What is lobola and why is it important?",
        culturalGroup: "Zulu"
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Local API endpoint is working!');
      console.log(`   Source: ${data.source}`);
      console.log(`   Answer: ${data.answer.substring(0, 100)}...`);
    } else {
      const errorText = await response.text();
      console.log(`❌ Local API error: ${response.status}`);
      console.log(`   Error: ${errorText}`);
      console.log('   Make sure your server is running with: npm run dev');
    }
  } catch (error) {
    console.log(`❌ Local API connection error: ${error.message}`);
    console.log('   Make sure your server is running with: npm run dev');
  }
  
  console.log('\n✨ Test completed!');
  console.log('\n📚 Next steps:');
  console.log('1. Start your server: npm run dev');
  console.log('2. Test with the frontend application');
  console.log('3. Monitor response quality and accuracy');
}

// Run the test
testIntegration().catch(console.error); 