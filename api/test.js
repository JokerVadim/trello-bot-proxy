// api/test.js
export default async function handler(req, res) {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Vercel function is working!',
    timestamp: new Date().toISOString()
  });
}
