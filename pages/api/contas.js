import { guardarJsonNoGithub } from '../../lib/github-utils';

export default async function handler(req, res) {
  const repoPath = 'data/contas.json';
  const contas = await guardarJsonNoGithub.carregar(repoPath);

  if (req.method === 'GET') {
    return res.status(200).json(contas);
  }

  if (req.method === 'POST') {
    const { descricao, valor, tipo } = req.body;
    if (!descricao || !valor || !tipo)
      return res.status(400).json({ erro: 'Campos obrigatórios em falta.' });

    const novaEntrada = {
      id: Date.now().toString(),
      data: new Date().toLocaleString('pt-PT', {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
      descricao,
      valor: parseFloat(valor),
      tipo,
    };

    const atualizados = [novaEntrada, ...contas];
    await guardarJsonNoGithub.gravar(repoPath, atualizados);

    return res.status(200).json({ sucesso: true });
  }

  if (req.method === 'PUT') {
    const { id, descricao, valor, tipo } = req.body;
    const index = contas.findIndex((c) => c.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Registo não encontrado.' });

    contas[index] = { ...contas[index], descricao, valor: parseFloat(valor), tipo };
    await guardarJsonNoGithub.gravar(repoPath, contas);
    return res.status(200).json({ sucesso: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    const atualizados = contas.filter((c) => c.id !== id);
    await guardarJsonNoGithub.gravar(repoPath, atualizados);
    return res.status(200).json({ sucesso: true });
  }

  return res.status(405).end();
}
