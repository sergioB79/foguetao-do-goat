import { useState } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

export default function Contacto() {
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nome: 'capitaoGOAT', // substitui com o nome do utilizador logado futuramente
      mensagem,
    };

    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEnviado(true);
      setMensagem('');
    } else {
      alert('Erro ao enviar a mensagem.');
    }
  };

  return (
    <Layout>
 	 <Head>
    		<title>📬 Contacto com o Comandante - Foguetão do GOAT</title>
  	</Head>
      <h1>📬 Contacto com o Comandante</h1>
      {enviado ? (
        <p>✅ Mensagem enviada com sucesso. O comandante agradece!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            ✍️ Mensagem:
            <br />
            <textarea
              rows="4"
              cols="50"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              style={{ width: '100%', marginTop: '8px' }}
              required
            />
          </label>
          <br />
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#00d4ff',
              border: 'none',
              borderRadius: '4px',
              color: 'black',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Enviar ao Comandante
          </button>
        </form>
      )}
    </Layout>
  );
}
