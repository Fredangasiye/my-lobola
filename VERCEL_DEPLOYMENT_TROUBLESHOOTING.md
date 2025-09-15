# 🔧 Vercel Deployment Troubleshooting Guide

## 🚨 **Current Issue: DEPLOYMENT_NOT_FOUND**

The deployment is not being found on Vercel. This usually means:
1. The deployment failed completely
2. The project URL is incorrect
3. The project needs to be reconnected to Vercel

## 🔧 **Step-by-Step Fix:**

### **1. Check Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Look for your project: `my-lobola-app`
3. Check if it shows as "Failed" or "Building"

### **2. If Project Shows as Failed:**
1. Click on the failed deployment
2. Check the build logs for errors
3. Look for specific error messages

### **3. If Project is Missing:**
The project might need to be reconnected to Vercel:

#### **Option A: Reconnect via Git**
1. Go to Vercel dashboard
2. Click "New Project"
3. Import from Git: `Fredangasiye/my-lobola`
4. Set build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`

#### **Option B: Deploy via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd my-lobola
vercel --prod
```

### **4. Environment Variables Setup**
After successful deployment, set environment variables:

1. Go to Project Settings → Environment Variables
2. Add:
   ```
   Name: OPENROUTER_API_KEY
   Value: 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
   Environment: Production, Preview, Development
   ```

### **5. Verify Correct URL**
The correct URL should be something like:
- `https://my-lobola-app-username.vercel.app`
- `https://my-lobola-app-git-main-username.vercel.app`

Check your Vercel dashboard for the exact URL.

## 🔧 **Common Issues & Solutions:**

### **Issue 1: Build Failures**
**Symptoms**: Deployment fails during build
**Solution**: 
- Check `package.json` for correct scripts
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Check for TypeScript errors

### **Issue 2: Runtime Errors**
**Symptoms**: Function runtime errors
**Solution**:
- Use Node 18.x (already fixed)
- Use `@vercel/node@2.0.0` runtime (already fixed)

### **Issue 3: Environment Variables**
**Symptoms**: API returns 401 or undefined
**Solution**:
- Set `OPENROUTER_API_KEY` in Vercel dashboard
- Ensure it's set for all environments

### **Issue 4: API Routes Not Found**
**Symptoms**: 404 errors on API endpoints
**Solution**:
- Ensure API files are in `/api/` directory
- Check `vercel.json` configuration
- Verify function runtime settings

## 🧪 **Testing After Fix:**

### **1. Test Health Endpoint:**
```bash
curl https://your-correct-url.vercel.app/api/health
```
**Expected**: `{"status":"ok","message":"API is running"}`

### **2. Test Uncle Wisdom:**
```bash
curl -X POST https://your-correct-url.vercel.app/api/uncle-wisdom-openrouter \
  -H "Content-Type: application/json" \
  -d '{"question": "What is lobola?", "culturalGroup": "Zulu"}'
```
**Expected**: JSON response with wisdom

### **3. Test Question Filtering:**
```bash
curl -X POST https://your-correct-url.vercel.app/api/uncle-wisdom-openrouter \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the weather?", "culturalGroup": "General"}'
```
**Expected**: 400 error with message about lobola-only questions

## 📋 **Checklist:**

- [ ] Project exists in Vercel dashboard
- [ ] Latest deployment is successful (not failed)
- [ ] Environment variables are set
- [ ] API endpoints are accessible
- [ ] OpenRouter integration works
- [ ] Question filtering works

## 🆘 **If Still Having Issues:**

1. **Check Vercel Status**: https://vercel-status.com
2. **Vercel Documentation**: https://vercel.com/docs
3. **OpenRouter Documentation**: https://openrouter.ai/docs
4. **Check Function Logs**: In Vercel dashboard → Functions tab

---

**Next Steps:**
1. Check your Vercel dashboard for the project status
2. Follow the troubleshooting steps above
3. Let me know what you find in the dashboard 