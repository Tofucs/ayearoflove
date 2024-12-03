import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Group } from './types';

interface PictureGroupProps {
  group: Group;
  progress: number;
  isFront: boolean;
  direction: 'up' | 'down' | null;
  cursorPos: { x: number; y: number };
}

const PictureGroup: React.FC<PictureGroupProps> = ({ group, progress, isFront, cursorPos }) => {
  const [showCaptions, setShowCaptions] = useState<boolean>(false);

  const snappedOpacity = Math.abs(progress) < 0.1 ? 1
    : Math.abs(progress) > 0.6
      ? 0
      : 1 - Math.abs(progress);
  console.log("progress:" + progress);
  const scale =
    progress > 0
      ? 1 + progress * 1.5 // Shrinks as it moves away
      : 1 + Math.abs(progress) * -0.3; // Grows larger as it comes closer
  const translateX = progress * 0;
  const rotateY = 0; // Skew for perspective

  const handleLabelClick = () => {
    setShowCaptions((prev) => !prev);
  };

  return (
    <motion.div
      className={`picture-group ${isFront ? 'is-front' : ''}`}
      style={{
        transform: `
          perspective(1000px)
          scale(${scale})
          translateX(${translateX}px)
          rotateY(${rotateY}deg)
        `,
        opacity: snappedOpacity,
        pointerEvents: isFront ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 onClick={handleLabelClick} style={{ cursor: 'pointer' }}>
        {group.label}
      </h2>

      <div className="pictures">
        {group.pictures.map((picture, index) => {
          return (
            <ShyPicture
              key={index}
              src={picture.src}
              caption={picture.caption}
              cursorPos={cursorPos}
              showCaptions={showCaptions}
              isFront={isFront}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

interface ShyPictureProps {
  src: string;
  caption: string;
  cursorPos: { x: number; y: number };
  showCaptions: boolean;
  isFront: boolean;
}

const ShyPicture: React.FC<ShyPictureProps> = ({ src, caption, cursorPos, showCaptions, isFront }) => {
  const pictureRef = useRef<HTMLDivElement>(null);

  const calculateDisplacement = () => {
    if (!pictureRef.current || !isFront) return { x: 0, y: 0 };

    const rect = pictureRef.current.getBoundingClientRect();
    const pictureCenterX = rect.left + rect.width / 2;
    const pictureCenterY = rect.top + rect.height / 2;

    const distanceX = cursorPos.x - pictureCenterX;
    const distanceY = cursorPos.y - pictureCenterY;

    return {
      x: Math.min(10, -distanceX * 0.05), // Limit the displacement
      y: Math.min(10, -distanceY * 0.05),
    };
  };

  const displacement = calculateDisplacement();

  return (
    <motion.div
      ref={pictureRef}
      className="picture-container"
      animate={{
        x: displacement.x,
        y: displacement.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
    >
      <img src={src} alt={caption} />
      <AnimatePresence>
        {showCaptions && (
          <motion.p
            className="caption"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {caption}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PictureGroup;
