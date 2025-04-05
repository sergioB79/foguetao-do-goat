export const config = {
  runtime: 'nodejs'
};

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'diario.json');

function lerPosts() {
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(file);
  } catch (e) {
    console.error('Erro a ler diário:', e);
    return [];
  }
}

function gravarPosts(posts) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error('Erro a gravar diário:', err);
    throw err;
  }
}

function gerarId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 5);
}

function gerarData() {
  return new Date().toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' });
}

export default function handler(req, res) {
  let posts = lerPosts();

  if (req.method === 'GET') {
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    try {
      const { titulo, texto, emoji } = req.body;

      if (!titulo || !texto || !emoji) {
        return res.status(400).json({ erro: 'Campos em falta.' });
      }

      const novoPost = {
        id: gerarId(),
        data: gerarData(),
        titulo,
        texto,
        emoji,
        likes: 0
      };

      posts.unshift(novoPost);
      gravarPosts(posts);

      return res.status(200).json({ sucesso: true, post: novoPost });
    } catch (err) {
      return res.status(500).json({ erro: 'Erro ao gravar post' });
    }
  }

  if (req.method === 'PUT') {
    const { id, titulo, texto, emoji } = req.body;

    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Post não encontrado' });

    posts[index] = { ...posts[index], titulo, texto, emoji };
    gravarPosts(posts);

    return res.status(200).json({ sucesso: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;

    posts = posts.filter((p) => p.id !== id);
    gravarPosts(posts);

    return res.status(200).json({ sucesso: true });
  }

  if (req.method === 'PATCH') {
    const { id } = req.body;

    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Post não encontrado' });

    posts[index].likes += 1;
    gravarPosts(posts);

    return res.status(200).json({ sucesso: true });
  }

  return res.status(405).end(); // Método não permitido
}
