import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Gallery from './Gallery';
import HeartBackground from './BubbleBg';
import LightEffect from './Light';
import "./index.css"

const App: React.FC = () => {
  const [state, setState] = useState<number>(0)
  const [input, setInput] = useState<string>('');

  const secret = '120323'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleStart = () => {
    if (input === secret) {
      setState(1);
      setTimeout(() => setState(2), 4000);
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {state === 2 && (
          <>
            <HeartBackground />
            <Gallery />
          </>
        )}
        {state === 0 && (
          <motion.div
            className="prompt"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1>Enter the secret password:</h1>
            <input
              type="password"
              value={input}
              onChange={handleInputChange}
              className="password-input"
              placeholder="Enter password"
            />
            <button onClick={handleStart} className="start-button">
              Unlock
            </button>
          </motion.div>
        )}

        {state === 1 && (
          <motion.div
            className="animation-container"
            key="animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="happy-title"
              initial={{ scale: 0, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ y: -200, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 15,
              }}
            >
              Happy 1 year Alma!
            </motion.h1>
            <motion.img
              src="/images/orangecat.webp"
              alt="Cat Sprite"
              className="cat-sprite"
              initial={{ y: -50, scale: 0 }}
              animate={{ y: -80, x: 200, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 10,
              }}
              exit={{ y: -300, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;