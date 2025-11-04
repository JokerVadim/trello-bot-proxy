// NEW webhook.js - ultra simple
export default function handler(req, res) {
  console.log('Webhook called');
  res.status(200).json({ 
    message: 'NEW webhook is working!',
    simple: true
  });
}
