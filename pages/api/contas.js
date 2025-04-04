// pages/api/contas.js

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'contas.json');

function lerContas() {
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
}

function gravarContas(contas) {
  fs.writeFileSync(filePath, JSON.stringify(contas, null, 2));
}

export default function handler(req, res) {
  const contas = lerContas();

  if (req.method === 'GET') {
    return res.status(200).json(contas);
  }

  if (req.method === 'POST') {
    const { descricao, valor, tipo } = req.body;

    if (!descricao || !valor || !tipo) {
      return res.status(400).json({ erro: 'Campos obrigatórios em falta.' });
    }

    const novaEntrada = {
      id: new Date().toISOString(),
      data: new Date().toISOString().split('T')[0],
      descricao,
      valor: parseFloat(valor),
      tipo
    };

    contas.unshift(novaEntrada);
    gravarContas(contas);
    return res.status(200).json({ sucesso: true });
  }

  if (req.method === 'PUT') {
    const { id, descricao, valor, tipo } = req.body;
    const index = contas.findIndex((c) => c.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Registo não encontrado.' });

    contas[index] = { ...contas[index], descricao, valor: parseFloat(valor), tipo };
    gravarContas(contas);
    return res.status(200).json({ sucesso: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const novas = contas.filter((c) => c.id !== id);
    gravarContas(novas);
    return res.status(200).json({ sucesso: true });
  }

  return res.status(405).end();
}
