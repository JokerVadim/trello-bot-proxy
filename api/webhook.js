import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log('📨 Received webhook from Telegram');
    
    try {
      const { message } = req.body;
      
      if (message && message.text === '/start') {
        const chatId = message.chat.id;
        console.log('🎯 Processing /start from:', chatId);
        
        // Твои константы
        const TELEGRAM_TOKEN = '6691235654:AAFsKfPaN3N5qAcGBT7NLdIZDHeMH5s61aE';
        const GAS_URL = 'https://script.google.com/macros/s/AKfycbzheUEzR7g9fBb08Ik-8oCP2d4mCrwFeJNIPSiyQlMOt9F4rR-bGHC4bVh70j7rT8ROyg/exec';
        
        // 1. Отправляем статистику в GAS
        try {
          await fetch(GAS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              board_id: '',
              columns_count: 0,
              isNewNotification: false,
              userData: {
                username: message.from.username || '',
                firstName: message.from.first_name || '',
                lastName: message.from.last_name || ''
              }
            })
          });
          console.log('✅ Data sent to GAS');
        } catch (gasError) {
          console.log('⚠️ GAS error:', gasError.message);
        }
        
        // 2. Отвечаем пользователю в Telegram
        try {
          await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `🆔 Ваш ID: <code>${chatId}</code>\n\n✅ Vercel + GAS работают!`,
              parse_mode: 'HTML'
            })
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
