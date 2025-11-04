export default async function handler(req, res) {
  console.log('📨 Webhook called');
  
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      console.log('Received message:', message);
      
      if (message && message.text === '/start') {
        const chatId = message.chat.id;
        console.log('Processing /start from:', chatId);
        
        // ПРОСТОЙ ответ без GAS
        return res.status(200).json({ 
          status: 'OK',
          message: '✅ Vercel работает! Chat ID: ' + chatId
        });
      }
      
      // Если не /start, всё равно отвечаем OK
      res.status(200).json({ status: 'OK' });
      
    } catch (error) {
      console.error('Error:', error);
      res.status(200).json({ status: 'OK' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
