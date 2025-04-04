// pages/api/contacto.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ mensagem: 'Método não permitido' });
  }

  const { nome = 'Tripulante anónimo', mensagem } = req.body;

  if (!mensagem) {
    return res.status(400).json({ mensagem: 'Mensagem vazia.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${nome}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📬 Nova mensagem do Foguetão do GOAT`,
      text: mensagem,
      html: `<p><strong>De:</strong> ${nome}</p><p>${mensagem}</p>`,
    });

    res.status(200).json({ sucesso: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ mensagem: 'Erro ao enviar email.' });
  }
}
