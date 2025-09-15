# 🚀 Complete Vercel Deployment Guide for Uncle Wisdom OpenRouter

## 🔧 **Step 1: Set Environment Variables in Vercel**

1. **Go to your Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `my-lobola-app`
3. **Go to Settings** → **Environment Variables**
4. **Add the following variable**:

```
Name: OPENROUTER_API_KEY
Value: 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
Environment: Production, Preview, Development
```

## 🔧 **Step 2: Redeploy the Application**

### Option A: Via Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Click **"Redeploy"** button
3. Wait for deployment to complete

### Option B: Via Git Push (Recommended)
```bash
# Make a small change to trigger redeploy
git add .
git commit -m "Trigger redeploy with environment variables"
git push origin main
```

## 🔧 **Step 3: Verify Deployment**

After deployment completes, test the API:

```bash
# Test health endpoint
curl https://your-app-name.vercel.app/api/health

# Test Uncle Wisdom endpoint
curl -X POST https://your-app-name.vercel.app/api/uncle-wisdom-openrouter \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is lobola?",
    "culturalGroup": "Zulu"
  }'
```

## 🔧 **Step 4: Check Vercel Function Logs**

1. Go to your Vercel dashboard
2. Click on your latest deployment
3. Go to **"Functions"** tab
4. Check for any errors in the API routes

## 🎯 **Expected Results**

### **Successful Response:**
```json
{
  "answer": "Greetings, my dear young one! I am Uncle Wisdom...",
  "source": "openrouter-mistral",
  "culturalGroup": "Zulu",
  "model": "mistralai/mistral-7b-instruct"
}
```

### **Error Response (Non-lobola Question):**
```json
{
  "error": "This question is not related to lobola or African marriage traditions..."
}
```

## 🚨 **Troubleshooting**

### **If API routes return HTML instead of JSON:**
- Check that the API files are in the correct location (`/api/`)
- Verify Vercel functions configuration
- Check deployment logs for build errors

### **If OpenRouter returns 401 errors:**
- Verify the API key is set correctly in Vercel
- Check that the key is valid and has credits
- Ensure the key is set for all environments

### **If deployment fails:**
- Check Vercel build logs
- Verify all dependencies are installed
- Check for any syntax errors in the code

## 📊 **Monitoring**

### **Vercel Dashboard:**
- Monitor function execution times
- Check for cold start issues
- Monitor API usage and costs

### **OpenRouter Dashboard:**
- Monitor API usage and credits
- Check response times
- Monitor any rate limiting

## 🎉 **Success Indicators**

✅ **Environment variable is set in Vercel**  
✅ **Deployment completes without errors**  
✅ **API endpoints return JSON responses**  
✅ **OpenRouter integration works**  
✅ **Question filtering works correctly**  
✅ **Fallback system works when needed**  

---

**Need Help?**
- Check Vercel documentation: https://vercel.com/docs
- OpenRouter documentation: https://openrouter.ai/docs
- Check your Vercel dashboard for logs and errors 