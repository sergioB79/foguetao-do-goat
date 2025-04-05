import fetch from 'node-fetch';

const TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPO;
const BRANCH = process.env.GITHUB_BRANCH || 'master';

async function carregar(caminho) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${caminho}?ref=${BRANCH}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3.raw',
    },
  });

  if (!res.ok) return [];

  const json = await res.text();
  try {
    return JSON.parse(json);
  } catch (e) {
    return [];
  }
}

async function gravar(caminho, dados) {
  const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${caminho}?ref=${BRANCH}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  const existente = getRes.ok ? await getRes.json() : {};
  const sha = existente.sha;

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${caminho}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: `Atualizado ${caminho}`,
      content: Buffer.from(JSON.stringify(dados, null, 2)).toString('base64'),
      branch: BRANCH,
      sha,
    }),
  });

  if (!res.ok) {
    const erro = await res.json();
    throw new Error(`Erro ao guardar no GitHub: ${erro.message}`);
  }
}

export const guardarJsonNoGithub = { carregar, gravar };
