// api/webhook.js
export default async function handler(req, res) {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Webhook is working!',
    timestamp: new Date().toISOString()
  });
}
