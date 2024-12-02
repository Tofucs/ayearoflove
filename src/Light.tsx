import React, { useEffect, useRef } from 'react';
import './light-effect.css';

const LightEffect: React.FC = () => {
  const lightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX - 100}px`;
        lightRef.current.style.top = `${e.clientY - 100}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div className="light-effect-background"><div ref={lightRef} className="light"></div></div>;
};

export default LightEffect;
