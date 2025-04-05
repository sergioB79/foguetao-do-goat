import Layout from '../components/Layout';
import Head from 'next/head';

export default function RelatorioTrades() {
  return (
    <Layout>
      <Head>
        <title>📊 Relatórios de Trades - Foguetão do GOAT</title>
      </Head>
      <h1>📊 Relatório Diário de Trades</h1>
      <p>
        Acede ao relatório externo da missão clicando no botão abaixo:
      </p>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.2rem' }}>
          ✈️ Milhas voadas desde o início da viagem (2.5k → fase1)
        </h2>
        <img
          src="/api/proxy-image"
          alt="Resumo de Milhas Voadas"
          style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        />
      </div>

      <p style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a
          href="http://18.195.234.74:8888/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#00d4ff',
            fontWeight: 'bold',
            textDecoration: 'underline',
            fontSize: '1.1rem'
          }}
        >
          🔗 Ver Relatório Diário Externo
        </a>
      </p>
    </Layout>
  );
}

