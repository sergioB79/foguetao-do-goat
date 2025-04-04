import { useEffect, useState } from 'react';

export default function ParallaxBackground({ children }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10; // ajusta intensidade
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'fixed',
          top: `${offset.y}px`,
          left: `${offset.x}px`,
          height: '110vh',
          width: '110vw',
          zIndex: -1,
          backgroundImage: 'url("/img/bk.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'transform 0.1s ease-out',
          filter: 'brightness(0.6)',
        }}
      ></div>

      {children}
    </div>
  );
}
