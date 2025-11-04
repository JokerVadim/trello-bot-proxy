export default async function handler(req, res) {
  console.log('✅ Ultra simple function called');
  
  try {
    // Просто возвращаем успешный ответ
    return res.status(200).json({ 
      status: 'SUCCESS',
      message: 'Ultra simple function is working!',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(200).json({ 
      status: 'ERROR', 
      error: error.message 
    });
  }
}
