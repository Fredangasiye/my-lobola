// Test script for Vercel deployment of Uncle Wisdom OpenRouter
import fetch from 'node-fetch';

const VERCEL_URL = 'https://my-lobola-app.vercel.app';

async function testVercelDeployment() {
  console.log('🧪 Testing Vercel Deployment of Uncle Wisdom OpenRouter\n');
  
  // Test the health endpoint first
  console.log('1. Testing health endpoint...');
  try {
    const healthResponse = await fetch(`${VERCEL_URL}/api/health`);
    if (healthResponse.ok) {
      console.log('✅ Health endpoint working');
    } else {
      console.log('❌ Health endpoint failed');
    }
  } catch (error) {
    console.log('❌ Health endpoint error:', error.message);
  }
  
  // Test the Uncle Wisdom OpenRouter endpoint
  console.log('\n2. Testing Uncle Wisdom OpenRouter endpoint...');
  try {
    const response = await fetch(`${VERCEL_URL}/api/uncle-wisdom-openrouter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: "What is lobola?",
        culturalGroup: "Zulu"
      })
    });

    const data = await response.json();
    
    if (response.ok && data.answer) {
      console.log('✅ Uncle Wisdom OpenRouter working!');
      console.log(`   Source: ${data.source}`);
      console.log(`   Model: ${data.model || 'N/A'}`);
      console.log(`   Answer: ${data.answer.substring(0, 100)}...`);
      
      if (data.source === 'openrouter-mistral') {
        console.log('🎉 OpenRouter LLM is working on Vercel!');
      } else {
        console.log('⚠️ Using fallback system - check environment variables');
      }
    } else {
      console.log('❌ Uncle Wisdom endpoint failed');
      console.log(`   Status: ${response.status}`);
      console.log(`   Response: ${JSON.stringify(data, null, 2)}`);
    }
  } catch (error) {
    console.log('❌ Uncle Wisdom endpoint error:', error.message);
  }
  
  // Test non-lobola question rejection
  console.log('\n3. Testing question filtering...');
  try {
    const response = await fetch(`${VERCEL_URL}/api/uncle-wisdom-openrouter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: "What's the weather like?",
        culturalGroup: "General"
      })
    });

    const data = await response.json();
    
    if (response.status === 400 && data.error) {
      console.log('✅ Question filtering working correctly');
    } else {
      console.log('❌ Question filtering not working');
      console.log(`   Status: ${response.status}`);
      console.log(`   Response: ${JSON.stringify(data, null, 2)}`);
    }
  } catch (error) {
    console.log('❌ Question filtering error:', error.message);
  }
  
  console.log('\n✨ Vercel deployment test completed!');
  console.log('\n📋 Next steps:');
  console.log('1. Check Vercel dashboard for environment variables');
  console.log('2. Ensure OPENROUTER_API_KEY is set in Vercel');
  console.log('3. Monitor function logs for any errors');
}

testVercelDeployment().catch(console.error); 