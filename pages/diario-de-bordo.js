import Layout from '../components/Layout';
import { isAdmin } from '../lib/permissions';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function DiarioDeBordo() {
  const [posts, setPosts] = useState([]);
  const [novo, setNovo] = useState({ titulo: '', texto: '', emoji: '🚀' });
  const [editando, setEditando] = useState(null);

  const carregarPosts = async () => {
    const res = await fetch('/api/diario');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    carregarPosts();
  }, []);

  const criarPost = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/diario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novo),
    });
    if (res.ok) {
      setNovo({ titulo: '', texto: '', emoji: '🚀' });
      carregarPosts();
    }
  };

  const apagarPost = async (id) => {
    if (!confirm('Apagar esta entrada?')) return;
    await fetch('/api/diario', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    carregarPosts();
  };

  const editarPost = (post) => {
    setEditando(post);
  };

  const guardarEdicao = async () => {
    await fetch('/api/diario', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editando),
    });
    setEditando(null);
    carregarPosts();
  };

  const darLike = async (id) => {
    const liked = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (liked.includes(id)) return alert('Já deste like!');

    await fetch('/api/diario', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    liked.push(id);
    localStorage.setItem('likedPosts', JSON.stringify(liked));
    carregarPosts();
  };

  return (
    <Layout>
      <Head>
        <title>📓 Diário de Bordo - Foguetão do GOAT</title>
      </Head>
      <h1>📓 Diário de Bordo</h1>

      {isAdmin() && (
        <form onSubmit={criarPost} style={{ marginBottom: '30px' }}>
          <h3>➕ Nova Entrada</h3>
          <label>Emoji:
            <input
              value={novo.emoji}
              onChange={(e) => setNovo({ ...novo, emoji: e.target.value })}
              required
              style={{ marginLeft: '10px' }}
            />
          </label><br />
          <label>Título:
            <input
              value={novo.titulo}
              onChange={(e) => setNovo({ ...novo, titulo: e.target.value })}
              required
              style={{ width: '100%' }}
            />
          </label><br />
          <label>Texto:
            <textarea
              value={novo.texto}
              onChange={(e) => setNovo({ ...novo, texto: e.target.value })}
              required
              style={{ width: '100%' }}
              rows="3"
            />
          </label><br />
          <button type="submit" style={{ marginTop: '10px' }}>Publicar</button>
        </form>
      )}

      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ marginBottom: '30px' }}>
            {editando?.id === post.id ? (
              <div>
                <input
                  value={editando.titulo}
                  onChange={(e) => setEditando({ ...editando, titulo: e.target.value })}
                  style={{ width: '100%' }}
                />
                <textarea
                  value={editando.texto}
                  onChange={(e) => setEditando({ ...editando, texto: e.target.value })}
                  style={{ width: '100%' }}
                  rows="3"
                />
                <input
                  value={editando.emoji}
                  onChange={(e) => setEditando({ ...editando, emoji: e.target.value })}
                />
                <br />
                <button onClick={guardarEdicao}>💾 Guardar</button>
                <button onClick={() => setEditando(null)} style={{ marginLeft: '10px' }}>❌ Cancelar</button>
              </div>
            ) : (
              <div>
                <h3>{post.emoji} {post.titulo}</h3>
                <p><em>{post.data}</em></p>
                <p>{post.texto}</p>
                <p>🚀 Likes: {post.likes}</p>
                <button onClick={() => darLike(post.id)}>👍 Gostei</button>
                {isAdmin() && (
                  <>
                    <button onClick={() => editarPost(post)} style={{ marginLeft: '10px' }}>✏️ Editar</button>
                    <button onClick={() => apagarPost(post.id)} style={{ marginLeft: '10px', color: 'red' }}>🗑️ Apagar</button>
                  </>
                )}
              </div>
            )}
            <hr />
          </div>
        ))}
      </div>
    </Layout>
  );
}
