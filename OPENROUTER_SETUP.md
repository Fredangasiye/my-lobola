# 🚀 OpenRouter + Mistral Integration Setup Guide

This guide will help you set up the OpenRouter integration with Mistral LLM for the My Lobola App.

## 📋 Prerequisites

1. **OpenRouter Account**: Sign up at [OpenRouter.ai](https://openrouter.ai)
2. **API Key**: Get your free API key from OpenRouter dashboard
3. **Node.js**: Version 18+ installed

## 🔧 Setup Instructions

### 1. Get OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key

### 2. Configure Environment Variables

Create or update your `.env` file in the project root:

```bash
# OpenRouter Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Other existing variables...
NODE_ENV=development
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

## 🧪 Testing the Integration

### Quick Test

Run the simple test to verify the integration:

```bash
node test-simple.js
```

### Full Test Suite

Run the comprehensive test suite:

```bash
node test-openrouter.js
```

### Manual Testing

You can also test manually by making a POST request to:

```
POST http://localhost:3000/api/uncle-wisdom-openrouter
Content-Type: application/json

{
  "question": "What is lobola and why is it important?",
  "culturalGroup": "Zulu"
}
```

## 🔍 Features

### ✅ Lobola-Only Responses

The integration includes strict validation to ensure:
- Only lobola-related questions are answered
- Non-lobola questions are politely rejected
- Responses contain relevant cultural keywords

### 🌍 Cultural Awareness

- Supports multiple African cultural groups (Zulu, Xhosa, Sotho, Tswana, etc.)
- Provides culturally-specific advice
- Respects traditional and modern approaches

### 🛡️ Fallback System

- Robust fallback responses if OpenRouter is unavailable
- Error handling for API failures
- Graceful degradation

## 📊 Model Information

- **Model**: `mistralai/mistral-7b-instruct`
- **Provider**: OpenRouter (free tier available)
- **Response Time**: ~2-5 seconds
- **Token Limit**: 300 tokens per response

## 🔧 Configuration Options

### Environment Variables

```bash
# Required
OPENROUTER_API_KEY=your_api_key

# Optional
NODE_ENV=development|production
```

### API Parameters

The integration uses these optimized parameters:

```javascript
{
  max_tokens: 300,
  temperature: 0.7,
  top_p: 0.9,
  frequency_penalty: 0.1,
  presence_penalty: 0.1
}
```

## 🚨 Troubleshooting

### Common Issues

1. **API Key Not Found**
   - Ensure `OPENROUTER_API_KEY` is set in your `.env` file
   - Restart your development server after adding the key

2. **Connection Errors**
   - Check your internet connection
   - Verify your OpenRouter API key is valid
   - Ensure you have credits in your OpenRouter account

3. **Non-Lobola Questions Being Answered**
   - The system should reject non-lobola questions
   - Check the keyword validation logic in the code

4. **Slow Responses**
   - Mistral-7B is a free model and may be slower
   - Consider upgrading to a paid model for better performance

### Debug Mode

To enable debug logging, add to your `.env`:

```bash
DEBUG=true
```

## 📈 Monitoring

The API returns metadata with each response:

```json
{
  "answer": "Response text...",
  "source": "openrouter-mistral",
  "culturalGroup": "Zulu",
  "model": "mistralai/mistral-7b-instruct"
}
```

## 🔄 Updating the Integration

To update the integration:

1. Pull the latest code
2. Update dependencies: `npm install`
3. Test the integration: `node test-simple.js`
4. Deploy to production

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the OpenRouter documentation
3. Check the application logs for error details
4. Test with the provided test scripts

## 🎯 Next Steps

After successful integration:

1. Test with various cultural groups
2. Monitor response quality
3. Consider upgrading to a paid model for production
4. Implement response caching for better performance
5. Add user feedback collection

---

**Note**: This integration uses the free Mistral model through OpenRouter. For production use, consider upgrading to a paid model for better performance and reliability. 