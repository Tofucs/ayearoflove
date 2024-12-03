import React, { useEffect, useRef } from 'react';
import './bubble-background.css';

const HeartBackground: React.FC = () => {
  let heartCount = useRef(0)
  const maxHearts = 50 //should be unlimited
  useEffect(() => {
    const heartContainer = document.querySelector('.heart-background');

    if (!heartContainer) return;

    function createHeart() {
      if (heartCount.current > maxHearts) return
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${Math.random() * 40}vw`;
      heart.style.animationDuration = `${8 + Math.random() * 5}s`;
      heart.style.setProperty('--random-right', `${Math.random() * 60 + 0}vw`);
      heartContainer?.appendChild(heart);

      heartCount.current += 1;
      // Remove the heart after the animation ends
      heart.addEventListener('animationend', () => {
        heart.remove();
        heartCount.current -= 1;
      });
    }

    const interval = setInterval(createHeart, 800);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="heart-background"></div>;
};

export default HeartBackground;
