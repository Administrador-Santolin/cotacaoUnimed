// index.js
const sgMail = require('@sendgrid/mail');

// Substitua 'YOUR_SENDGRID_API_KEY' pela sua chave API do SendGrid
// É ALTAMENTE RECOMENDADO USAR VARIÁVEIS DE AMBIENTE para chaves API em produção!
// No Google Cloud Functions, você pode definir variáveis de ambiente.
// Ex: const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // <-- SUBSTITUA AQUI!

exports.sendQuotationEmail = async (req, res) => {
  // Configura CORS para permitir requisições do seu frontend
  res.set('Access-Control-Allow-Origin', '*'); // Permite qualquer origem. Em produção, restrinja ao seu domínio!
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Lida com requisições OPTIONS (preflight requests do CORS)
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { subject, body, formData } = req.body;

  if (!subject || !body || !formData) {
    res.status(400).json({ message: 'Dados incompletos para o envio do e-mail.' });
    return;
  }

  // Defina o endereço de e-mail para onde a cotação será enviada
  const TO_EMAIL = 'admin@santolinseguros.com.br'; // <-- SUBSTITUA AQUI!
  // Defina o endereço de e-mail verificado no SendGrid
  const FROM_EMAIL = 'admin@santolinseguros.com.br'; // <-- SUBSTITUA AQUI!

  const msg = {
    to: TO_EMAIL,
    from: FROM_EMAIL, // Must be a verified sender
    subject: subject,
    text: body, // Corpo do e-mail em texto simples
    html: `<strong>${body.replace(/\n/g, '<br>')}</strong><br><br>
           <p>--- Dados Detalhados ---</p>
           <pre>${JSON.stringify(formData, null, 2)}</pre>`, // Corpo do e-mail em HTML
  };

  try {
    await sgMail.send(msg);
    console.log('E-mail enviado com sucesso!');
    res.status(200).json({ message: 'Cotação enviada com sucesso! Nossa equipe entrará em contato em breve.' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error.response ? error.response.body : error);
    res.status(500).json({ message: 'Erro ao enviar a cotação. Por favor, tente novamente mais tarde.' });
  }
};