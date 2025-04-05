// pages/api/diario.js
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'diario.json');

console.log('Método:', req.method, 'Body:', req.body);

function lerPosts() {
  try {
    const file = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
}

function gravarPosts(posts) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error('Erro a gravar diário:', err);
  }
}

export default function handler(req, res) {
  const posts = lerPosts();

  if (req.method === 'GET') {
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { titulo, texto, emoji } = req.body;

    if (!titulo || !texto || !emoji) {
      return res.status(400).json({ erro: 'Campos em falta.' });
    }

    const novoPost = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      data: crypto.randomUUID(),
      titulo,
      texto,
      emoji,
      likes: 0
    };

    posts.unshift(novoPost);
    gravarPosts(posts);

    return res.status(200).json({ sucesso: true, post: novoPost });
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

    const novosPosts = posts.filter((p) => p.id !== id);
    gravarPosts(novosPosts);

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
