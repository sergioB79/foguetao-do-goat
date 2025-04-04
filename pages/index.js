import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import Layout from '../components/Layout';

export default function Home({ homeContent }) {
  return (
    <Layout>
      <Head>
        <title>Foguetão do GOAT 🚀</title>
      </Head>
      <h1>Welcome to the GOAT Rocket Blog!</h1>
      <p style={{ whiteSpace: 'pre-line' }}>{homeContent}</p>
    </Layout>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'home.txt');
  let homeContent = '';
  try {
    homeContent = fs.readFileSync(filePath, 'utf-8');
  } catch {}
  return {
    props: { homeContent },
  };
}
