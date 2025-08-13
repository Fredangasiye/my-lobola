// Test script for OpenRouter + Mistral integration
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://my-lobola-app.vercel.app/api' 
  : 'http://localhost:3000/api';

const testQuestions = [
  // Valid lobola-related questions
  {
    question: "How many cattle should I offer for lobola in Zulu culture?",
    culturalGroup: "Zulu",
    expectedKeywords: ["cattle", "zulu", "lobola", "respect"]
  },
  {
    question: "What is the traditional approach to lobola negotiations in Xhosa culture?",
    culturalGroup: "Xhosa", 
    expectedKeywords: ["xhosa", "negotiation", "lobola", "family"]
  },
  {
    question: "How do I show respect during lobola discussions?",
    culturalGroup: "Sotho",
    expectedKeywords: ["respect", "lobola", "family", "tradition"]
  },
  {
    question: "What are the modern approaches to lobola payments?",
    culturalGroup: "Tswana",
    expectedKeywords: ["modern", "payment", "lobola", "money"]
  },
  {
    question: "How should I prepare for my first lobola meeting?",
    culturalGroup: "General",
    expectedKeywords: ["meeting", "prepare", "lobola", "family"]
  },
  // Invalid questions (should be rejected)
  {
    question: "What's the weather like today?",
    culturalGroup: "General",
    shouldBeRejected: true
  },
  {
    question: "How do I cook traditional food?",
    culturalGroup: "Zulu", 
    shouldBeRejected: true
  },
  {
    question: "What's the best way to invest money?",
    culturalGroup: "General",
    shouldBeRejected: true
  }
];

async function testOpenRouterAPI() {
  console.log('🧪 Testing OpenRouter + Mistral Integration for Lobola App\n');
  
  let passedTests = 0;
  let totalTests = testQuestions.length;

  for (let i = 0; i < testQuestions.length; i++) {
    const test = testQuestions[i];
    console.log(`\n📝 Test ${i + 1}: "${test.question}"`);
    console.log(`   Cultural Group: ${test.culturalGroup}`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/uncle-wisdom-openrouter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: test.question,
          culturalGroup: test.culturalGroup
        })
      });

      const data = await response.json();
      
      if (test.shouldBeRejected) {
        // Test for rejection of non-lobola questions
        if (response.status === 400 && data.error && data.error.includes('not related to lobola')) {
          console.log('   ✅ PASSED: Question correctly rejected as non-lobola related');
          passedTests++;
        } else {
          console.log('   ❌ FAILED: Question should have been rejected but was accepted');
          console.log(`   Response: ${JSON.stringify(data, null, 2)}`);
        }
      } else {
        // Test for valid lobola responses
        if (response.status === 200 && data.answer) {
          console.log('   ✅ PASSED: Received valid response');
          console.log(`   Source: ${data.source}`);
          console.log(`   Model: ${data.model || 'N/A'}`);
          console.log(`   Answer: ${data.answer.substring(0, 100)}...`);
          
          // Check if response contains expected keywords
          const answerLower = data.answer.toLowerCase();
          const missingKeywords = test.expectedKeywords.filter(keyword => 
            !answerLower.includes(keyword.toLowerCase())
          );
          
          if (missingKeywords.length === 0) {
            console.log('   ✅ PASSED: Response contains expected keywords');
            passedTests++;
          } else {
            console.log(`   ⚠️  WARNING: Missing expected keywords: ${missingKeywords.join(', ')}`);
            passedTests++;
          }
        } else {
          console.log('   ❌ FAILED: Invalid response received');
          console.log(`   Status: ${response.status}`);
          console.log(`   Response: ${JSON.stringify(data, null, 2)}`);
        }
      }
    } catch (error) {
      console.log(`   ❌ FAILED: Request error - ${error.message}`);
    }
  }

  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! OpenRouter integration is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the implementation.');
  }
}

// Test API key configuration
async function testAPIKey() {
  console.log('\n🔑 Testing API Key Configuration...');
  
  if (!process.env.OPENROUTER_API_KEY) {
    console.log('❌ OPENROUTER_API_KEY not found in environment variables');
    console.log('Please add your OpenRouter API key to your .env file:');
    console.log('OPENROUTER_API_KEY=your_api_key_here');
    return false;
  }
  
  console.log('✅ OPENROUTER_API_KEY found in environment variables');
  return true;
}

// Test OpenRouter connectivity
async function testOpenRouterConnectivity() {
  console.log('\n🌐 Testing OpenRouter Connectivity...');
  
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
        max_tokens: 50
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ OpenRouter API is accessible');
      console.log(`   Model: ${data.model || 'N/A'}`);
      console.log(`   Usage: ${JSON.stringify(data.usage || 'N/A')}`);
      return true;
    } else {
      const errorText = await response.text();
      console.log(`❌ OpenRouter API error: ${response.status} - ${errorText}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ OpenRouter connectivity error: ${error.message}`);
    return false;
  }
}

// Main test execution
async function runTests() {
  console.log('🚀 Starting OpenRouter + Mistral Integration Tests\n');
  
  const apiKeyOk = await testAPIKey();
  if (!apiKeyOk) {
    console.log('\n❌ Cannot proceed without API key. Please configure OPENROUTER_API_KEY.');
    process.exit(1);
  }
  
  const connectivityOk = await testOpenRouterConnectivity();
  if (!connectivityOk) {
    console.log('\n❌ Cannot connect to OpenRouter API. Please check your API key and internet connection.');
    process.exit(1);
  }
  
  await testOpenRouterAPI();
  
  console.log('\n✨ Test suite completed!');
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { testOpenRouterAPI, testAPIKey, testOpenRouterConnectivity }; 