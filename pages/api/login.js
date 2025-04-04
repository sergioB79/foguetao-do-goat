// pages/api/login.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const filePath = path.join(process.cwd(), 'users.json');

  const rawData = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(rawData);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  // Simular token simples
  res.status(200).json({
    message: 'Login com sucesso!',
    user: {
      username: user.username,
      role: user.role
    }
  });
}
