// Test Hugging Face Inference API
import dotenv from 'dotenv';
dotenv.config();

const testHuggingFace = async () => {
  console.log('🧪 Testing Hugging Face Inference API...');
  
  // Try with a simple test first
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || 'hf_demo'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: '<s>[INST] What is lobola? [/INST]',
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7
        }
      })
    });
    
    console.log('Status:', response.status);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success:', data);
    } else {
      const error = await response.text();
      console.log('❌ Error:', error);
    }
  } catch (error) {
    console.log('❌ Network Error:', error.message);
  }
};

testHuggingFace(); 