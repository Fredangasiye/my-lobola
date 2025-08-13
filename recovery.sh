#!/bin/bash

echo "🚀 My Lobola App Recovery Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Not in my-lobola directory. Please run: cd ~/my-lobola"
    exit 1
fi

echo "✅ Current working directory: $(pwd)"

# Check if working backup exists
if [ -d "~/Documents/vAIB/quoter/my-lobola" ]; then
    echo "✅ Working backup found in Documents"
    echo "📁 Backup location: ~/Documents/vAIB/quoter/my-lobola"
else
    echo "⚠️  No backup found in Documents"
fi

echo ""
echo "🔧 Available recovery options:"
echo "1. Deploy current version: git push && vercel --prod --yes"
echo "2. Restore from backup: cp -r ~/Documents/vAIB/quoter/my-lobola/* ."
echo "3. Add API key: vercel env add HUGGINGFACE_API_KEY"
echo "4. Check status: git status && vercel ls"

echo ""
echo "📋 Current live URL:"
echo "https://my-lobola-pq0trib70-freds-projects-7c342310.vercel.app"

echo ""
echo "📖 For full details, see: PROJECT_STATUS.md"
