import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Missão secreta. A bordo do Foguetão do GOAT." />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="Foguetão do GOAT 🚀" />
        <meta property="og:description" content="Missão espacial com acesso restrito." />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
