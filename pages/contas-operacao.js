import Layout from '../components/Layout';
import { isAdmin } from '../lib/permissions';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function ContasOperacao() {
  const [registos, setRegistos] = useState([]);
  const [novo, setNovo] = useState({ descricao: '', valor: '', tipo: 'despesa' });
  const [editando, setEditando] = useState(null);

  const carregar = async () => {
    const res = await fetch('/api/contas');
    const data = await res.json();
    setRegistos(data);
  };

  useEffect(() => {
    carregar();
  }, []);

  const criar = async (e) => {
    e.preventDefault();
    await fetch('/api/contas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novo),
    });
    setNovo({ descricao: '', valor: '', tipo: 'despesa' });
    carregar();
  };

  const apagar = async (id) => {
    if (!confirm('Apagar este registo?')) return;
    await fetch('/api/contas', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    carregar();
  };

  const editar = (entrada) => {
    setEditando(entrada);
  };

  const guardarEdicao = async () => {
    await fetch('/api/contas', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editando),
    });
    setEditando(null);
    carregar();
  };

  return (
    <Layout>
  	<Head>
    		<title>💰 Contas da Operação - Foguetão do GOAT</title>
  	</Head>
      <h1>💰 Contas da Operação</h1>

      {isAdmin() && (
        <form onSubmit={criar} style={{ marginBottom: '30px' }}>
          <h3>➕ Novo Registo</h3>
          <label>Descrição:
            <input
              value={novo.descricao}
              onChange={(e) => setNovo({ ...novo, descricao: e.target.value })}
              required
              style={{ width: '100%' }}
            />
          </label><br />
          <label>Valor (€):
            <input
              type="number"
              value={novo.valor}
              onChange={(e) => setNovo({ ...novo, valor: e.target.value })}
              required
            />
          </label><br />
          <label>Tipo:
            <select
              value={novo.tipo}
              onChange={(e) => setNovo({ ...novo, tipo: e.target.value })}
            >
              <option value="despesa">Despesa</option>
              <option value="receita">Receita</option>
            </select>
          </label><br />
          <button type="submit" style={{ marginTop: '10px' }}>Adicionar</button>
        </form>
      )}

      <div>
        {registos.map((r) => (
          <div key={r.id} style={{ marginBottom: '20px' }}>
            {editando?.id === r.id ? (
              <div>
                <input
                  value={editando.descricao}
                  onChange={(e) => setEditando({ ...editando, descricao: e.target.value })}
                  style={{ width: '100%' }}
                />
                <input
                  type="number"
                  value={editando.valor}
                  onChange={(e) => setEditando({ ...editando, valor: e.target.value })}
                />
                <select
                  value={editando.tipo}
                  onChange={(e) => setEditando({ ...editando, tipo: e.target.value })}
                >
                  <option value="despesa">Despesa</option>
                  <option value="receita">Receita</option>
                </select><br />
                <button onClick={guardarEdicao}>💾 Guardar</button>
                <button onClick={() => setEditando(null)} style={{ marginLeft: '10px' }}>❌ Cancelar</button>
              </div>
            ) : (
              <div>
                <h4>{r.tipo === 'despesa' ? '📉' : '📈'} {r.descricao}</h4>
                <p><strong>Data:</strong> {r.data}</p>
                <p><strong>Valor:</strong> € {r.valor}</p>
                {isAdmin() && (
                  <>
                    <button onClick={() => editar(r)}>✏️ Editar</button>
                    <button onClick={() => apagar(r.id)} style={{ marginLeft: '10px', color: 'red' }}>🗑️ Apagar</button>
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
