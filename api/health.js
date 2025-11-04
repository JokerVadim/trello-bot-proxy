// api/health.js
export default function handler(req, res) {
  res.status(200).json({ 
    status: 'HEALTHY',
    message: 'Vercel function is working!',
    timestamp: new Date().toISOString()
  });
}
