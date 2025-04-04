import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUser, isBrowser } from '../lib/auth';
import ParallaxBackground from './ParallaxBackground';

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isBrowser()) {
      const stored = getUser();
      setUser(stored);
      if (!stored && router.pathname !== '/login') {
        router.replace('/login');
      }
    }
  }, [router]);

  if (!user && router.pathname !== '/login') {
    return null;
  }

  return (
    <ParallaxBackground>
      <div style={{
        minHeight: '100vh',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px'
      }}>
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '100%',
          color: 'white',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
        }}>
          <nav style={{ marginBottom: '30px', textAlign: 'center', fontSize: '18px' }}>
            <Link href="/">🏠 Home</Link> |{' '}
            <Link href="/diario-de-bordo">📓 Diário</Link> |{' '}
            <Link href="/relatorio-trades">📊 Relatórios</Link> |{' '}
            <Link href="/contas-operacao">💰 Contas</Link> |{' '}
            <Link href="/contacto">📬 Contacto</Link>
            {user && (
              <>
                <span style={{ marginLeft: '10px' }}>👤 {user.username}</span>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    router.push('/login');
                  }}
                  style={{
                    marginLeft: '10px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    background: 'red',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'white'
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
          <main>{children}</main>
        </div>
      </div>
    </ParallaxBackground>
  );
};

export default Layout;
