import axios from 'axios';

export default async function handler(req, res) {
  console.log('📨 Webhook called');
  
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      
      if (message && message.text === '/start') {
        const chatId = message.chat.id;
        console.log('Processing /start from:', chatId);
        
        const TELEGRAM_TOKEN = '6691235654:AAFsKfPaN3N5qAcGBT7NLdIZDHeMH5s61aE';
        
        // Отвечаем в Telegram
        try {
          await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: `🆔 Ваш ID: <code>${chatId}</code>\n\n✅ Vercel работает!`,
            parse_mode: 'HTML'
          });
          console.log('✅ Response sent to Telegram');
        } catch (tgError) {
          console.log('⚠️ Telegram error:', tgError.message);
        }
      }
      
      res.status(200).json({ status: 'OK' });
      
    } catch (error) {
      console.error('❌ Webhook error:', error);
      res.status(200).json({ status: 'OK' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
