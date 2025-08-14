// Debug environment variables
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const envInfo = {
    OPENROUTER_API_KEY: {
      exists: !!process.env.OPENROUTER_API_KEY,
      length: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.length : 0,
      preview: process.env.OPENROUTER_API_KEY ? process.env.OPENROUTER_API_KEY.substring(0, 15) + '...' : 'NOT SET',
      full: process.env.OPENROUTER_API_KEY || 'NOT SET'
    },
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('API') || key.includes('KEY')),
    timestamp: new Date().toISOString()
  };
  
  res.status(200).json(envInfo);
} 