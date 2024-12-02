// src/PictureGroup.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Group } from './types';

interface PictureGroupProps {
  group: Group;
  progress: number;
  isFront: boolean;
  direction: 'up' | 'down' | null
}

const PictureGroup: React.FC<PictureGroupProps> = ({ group, progress, isFront, direction }) => {

  const [showCaptions, setShowCaptions] = useState<boolean>(false);
  const snappedOpacity = Math.abs(progress) < 0.1 ? 1 : 1 - Math.abs(progress);
  const scale =
    direction === 'down'
      ? 1 + Math.abs(progress) * 0.2 // Zoom out toward the viewer
      : 1 - Math.abs(progress) * 0.2; // Zoom out away from the viewer
  const variants = {
    enter: (direction: 'up' | 'down') => ({
      scale: 0.8, // Start smaller for zoom-in effect
      rotateX: direction === 'up' ? 90 : -90, // Flip in from the top or bottom
      opacity: 0,
    }),
    center: {
      scale: 1, // Normal size
      rotateX: 0, // Fully visible
      opacity: 1,
    },
    exit: (direction: 'up' | 'down') => ({
      scale: 0.8, // Shrink for zoom-out effect
      rotateX: direction === 'up' ? -90 : 90, // Flip out to the bottom or top
      opacity: 0,
    }),
  };

  const groupVariants: Variants = {
    initial: { opacity: 0, scale: 0.8, rotateX: -90 },
    animate: { opacity: 1, scale: 1, rotateX: 0 },
    exit: { opacity: 0, scale: 0.8, rotateX: 90 },
  };

  const captionVariants = {
    hidden: { opacity: 0, y: 20 }, // Start slightly below and hidden
    visible: { opacity: 1, y: 0 }, // Fully visible in place
    exit: { opacity: 0, y: 20 }, // Slide down and fade out
  };

  const handleLabelClick = () => {
    setShowCaptions((prev) => !prev);
  };



  return (
    <motion.div
      className={`picture-group ${isFront ? 'is-front' : ''}`}
      style={{
        transform: `
        scale(${scale}) 
        rotateX(${progress * 45}deg)
      `, // Smooth scale and rotation
        opacity: snappedOpacity, // Fade out as progress moves
        pointerEvents: isFront ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 onClick={handleLabelClick} style={{ cursor: 'pointer' }}>
        {group.label}
      </h2>

      <div className="pictures">
        {group.pictures.map((picture, index) => (
          <div className="picture-container" key={index}>
            <img src={picture.src} alt={picture.caption} />
            <AnimatePresence>
              {showCaptions && (
                <motion.p
                  className="caption"
                  variants={captionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {picture.caption}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PictureGroup;
