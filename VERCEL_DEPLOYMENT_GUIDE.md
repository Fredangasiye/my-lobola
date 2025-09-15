# 🚀 Vercel Deployment Guide for OpenRouter Integration

## 📋 Prerequisites

1. **Vercel Account**: Make sure you have a Vercel account
2. **OpenRouter API Key**: Your working API key: `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`
3. **Git Repository**: Your code should be in a Git repository

## 🔧 Step-by-Step Deployment

### 1. **Configure Environment Variables in Vercel**

#### Option A: Via Vercel Dashboard
1. Go to your Vercel dashboard
2. Select your project (`my-lobola-app`)
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

```
Name: OPENROUTER_API_KEY
Value: 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
Environment: Production, Preview, Development
```

#### Option B: Via Vercel CLI
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variable
vercel env add OPENROUTER_API_KEY
# Enter: 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
```

### 2. **Deploy to Vercel**

#### Option A: Via Git Push (Recommended)
```bash
# Commit your changes
git add .
git commit -m "Add OpenRouter integration with Mistral LLM"
git push origin main
```

#### Option B: Via Vercel CLI
```bash
# Deploy from your project directory
vercel --prod
```

### 3. **Verify Deployment**

After deployment, test your API endpoints:

```bash
# Test the OpenRouter integration
curl -X POST https://your-app-name.vercel.app/api/uncle-wisdom-openrouter \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is lobola?",
    "culturalGroup": "Zulu"
  }'
```

## 🔍 Troubleshooting

### **Common Issues**

#### 1. **Environment Variables Not Loading**
- Make sure the environment variable is set for all environments (Production, Preview, Development)
- Redeploy after adding environment variables
- Check Vercel logs for any errors

#### 2. **API Routes Not Working**
- Verify the API routes are in the `/api` directory
- Check that the file names match the route names
- Ensure the functions are exported as default

#### 3. **CORS Issues**
- The API already includes CORS headers
- If you have issues, check the browser console for CORS errors

### **Debugging Steps**

1. **Check Vercel Logs**:
   ```bash
   vercel logs your-app-name.vercel.app
   ```

2. **Test Environment Variables**:
   ```bash
   # Add this to your API route temporarily
   console.log('API Key:', process.env.OPENROUTER_API_KEY ? 'Found' : 'Missing');
   ```

3. **Test API Endpoint**:
   ```bash
   curl -X POST https://your-app-name.vercel.app/api/health
   ```

## 📊 Expected Results

### **Successful Response**
```json
{
  "answer": "Greetings, my dear young one! I am Uncle Wisdom...",
  "source": "openrouter-mistral",
  "culturalGroup": "Zulu",
  "model": "mistralai/mistral-7b-instruct"
}
```

### **Error Response (Non-lobola Question)**
```json
{
  "error": "This question is not related to lobola or African marriage traditions..."
}
```

## 🎯 API Endpoints Available

### **Production URLs**
- **OpenRouter Integration**: `https://your-app-name.vercel.app/api/uncle-wisdom-openrouter`
- **Health Check**: `https://your-app-name.vercel.app/api/health`
- **Lobola Calculator**: `https://your-app-name.vercel.app/api/calculate`

### **Request Format**
```json
{
  "question": "Your lobola question here",
  "culturalGroup": "Zulu|Xhosa|Sotho|Tswana|Venda|Pedi|Swazi|Ndebele"
}
```

## 🔄 Deployment Commands

### **Quick Deploy**
```bash
# If you have Vercel CLI installed
vercel --prod

# Or push to Git (if connected to Vercel)
git push origin main
```

### **Environment Variables**
```bash
# Add environment variable
vercel env add OPENROUTER_API_KEY

# List environment variables
vercel env ls

# Remove environment variable (if needed)
vercel env rm OPENROUTER_API_KEY
```

## 📈 Monitoring

### **Check Deployment Status**
1. Go to your Vercel dashboard
2. Check the **Deployments** tab
3. Look for any build errors or warnings

### **Monitor API Usage**
1. Check Vercel function logs
2. Monitor OpenRouter usage in their dashboard
3. Watch for any rate limiting or errors

## 🎉 Success Indicators

✅ **Environment variable is set in Vercel**
✅ **Deployment completes without errors**
✅ **API endpoint responds with OpenRouter data**
✅ **Cultural responses are appropriate**
✅ **Non-lobola questions are rejected**

---

**Need Help?**
- Check Vercel documentation: https://vercel.com/docs
- OpenRouter documentation: https://openrouter.ai/docs
- Check your Vercel dashboard for logs and errors 