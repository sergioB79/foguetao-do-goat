import Layout from '../components/Layout';
import Head from 'next/head';

export default function RelatorioTrades() {
  return (
    <Layout>
      <Head>
    	<title>📊 Relatórios de Trades - Foguetão do GOAT</title>
      </Head>
      <h1>📊 Relatório de Trades</h1>
      <p>
        Acede ao relatório externo da missão clicando no botão abaixo:
      </p>
      <p>
        <a
          href="https://your-external-link.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#00d4ff',
            fontWeight: 'bold',
            textDecoration: 'underline'
          }}
        >
          🔗 Ver Relatório Externo
        </a>
      </p>
    </Layout>
  );
}
