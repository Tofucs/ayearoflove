import React from 'react';
import Gallery from './Gallery';
import HeartBackground from './BubbleBg';
import LightEffect from './Light';
import "./index.css"

const App: React.FC = () => {
  return (
    <div className="App">
      <Gallery />
      <HeartBackground />

    </div>
  );
};

export default App;