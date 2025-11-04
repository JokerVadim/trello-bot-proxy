// api/webhook.js - ONLY CONNECTION TEST
export default function handler(req, res) {
  console.log('✅ Telegram webhook received');
  
  // Просто отвечаем OK
  res.status(200).json({ 
    status: 'SUCCESS',
    message: 'Bot is connected!',
    timestamp: new Date().toISOString()
  });
}
