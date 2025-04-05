import { guardarJsonNoGithub } from '../../lib/github-utils';

export default async function handler(req, res) {
  const repoPath = 'data/diario.json';
  const posts = await guardarJsonNoGithub.carregar(repoPath);

  if (req.method === 'GET') {
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const { titulo, texto, emoji } = req.body;
    if (!titulo || !texto || !emoji)
      return res.status(400).json({ erro: 'Campos em falta.' });

    const novoPost = {
      id: Date.now().toString(),
      data: new Date().toLocaleString('pt-PT', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      titulo,
      texto,
      emoji,
      likes: 0,
    };

    const atualizados = [novoPost, ...posts];
    await guardarJsonNoGithub.gravar(repoPath, atualizados);

    return res.status(200).json({ sucesso: true, post: novoPost });
  }

  if (req.method === 'PATCH') {
    const { id } = req.body;
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Post não encontrado' });

    posts[index].likes += 1;
    await guardarJsonNoGithub.gravar(repoPath, posts);
    return res.status(200).json({ sucesso: true });
  }

  if (req.method === 'PUT') {
    const { id, titulo, texto, emoji } = req.body;
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Post não encontrado' });

    posts[index] = { ...posts[index], titulo, texto, emoji };
    await guardarJsonNoGithub.gravar(repoPath, posts);
    return res.status(200).json({ sucesso: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const novos = posts.filter((p) => p.id !== id);
    await guardarJsonNoGithub.gravar(repoPath, novos);
    return res.status(200).json({ sucesso: true });
  }

  return res.status(405).end();
}
