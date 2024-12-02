// src/Gallery.tsx
import React, { useState, WheelEvent, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import PictureGroup from './PictureGroup.tsx';
import { Group } from './types';
import './styles.css'

const Gallery: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  const SCROLL_AMOUNT = 1000;
  const SLOW_SCROLL_AMOUNT = 4000;
  const SNAP_THRESH = 0.1;
  const SCROLL_SLOWDOWN_FACTOR = 0.3;

  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     console.log('Start fetch');
  //     try {
  //       const response = await fetch('/api/groups');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data: Group[] = await response.json();
  //       console.log('Fetched groups:', data); // Log the data
  //       setGroups(data);
  //     } catch (error) {
  //       console.error('Error fetching groups:', error);
  //     }
  //   };
  //   fetchGroups();
  // }, []);

  useEffect(() => {
    const staticGroups: Group[] = [
      {
        label: 'Group 1',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 3' },
        ],
      },

      {
        label: 'Group 2',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 3',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 4',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 5',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 6',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 7',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 8',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 9',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 10',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 11',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
      {
        label: 'Group 12',
        pictures: [
          { src: 'https://via.placeholder.com/200', caption: 'Caption 1' },
          { src: 'https://via.placeholder.com/200', caption: 'Caption 2' },
        ],
      },
    ];
    setGroups(staticGroups); // Use static data lol aint doing fetching shit
  }, []);

  const nextGroup = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % groups.length);
  };

  const prevGroup = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex - 1 + groups.length) % groups.length);
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    let scroll = event.deltaY;

    const fractionalProgress = scrollProgress % 1;
    const isNearWhole = Math.abs(fractionalProgress) < SNAP_THRESH || Math.abs(fractionalProgress - 1) < SNAP_THRESH;
    setScrollDirection(scroll > 0 ? 'down' : 'up');

    if (isNearWhole) {
      scroll *= SCROLL_SLOWDOWN_FACTOR;
      setScrollProgress((prev) => {
        const newPos = prev + scroll / SLOW_SCROLL_AMOUNT;

        if (newPos < 0) return 0;
        if (newPos > groups.length - 1) return groups.length - 1;

        return prev + scroll / SLOW_SCROLL_AMOUNT
      });
      console.log("near whole, scroll: " + scroll)
    } else {
      setScrollProgress((prev) => {
        const newPos = prev + scroll / SCROLL_AMOUNT;

        if (newPos < 0) return 0;
        if (newPos > groups.length - 1) return groups.length - 1;

        return prev + scroll / SCROLL_AMOUNT
      });
      console.log("not near, scroll: " + scroll)
    }




  };

  return (
    <div className="gallery-container" onWheel={handleWheel}>
      <h1>Testing onWheel</h1>
      {groups.length > 0 ? (
        <motion.div
          className="group-wrapper"
          style={{
            transform: `translateZ(${scrollProgress * -500
              }px)`, // Adjust position based on progress
          }}
        >
          {/* <PictureGroup
            key={Math.floor(scrollProgress)} // Determine base group index
            group={groups[Math.abs(Math.floor(scrollProgress)) % groups.length]}
            progress={scrollProgress % 1} // Pass fractional progress
          />
          <PictureGroup
            key={Math.ceil(scrollProgress)} // Next or previous group index
            group={groups[Math.abs(Math.ceil(scrollProgress)) % groups.length]}
            progress={scrollProgress % 1 - 1} // Adjust for next/previous group
          /> */}
          {groups.map((group, index) => (
            <PictureGroup
              key={index}
              group={group}
              progress={scrollProgress - index}
              direction={scrollDirection}
              isFront={Math.abs(scrollProgress - index) < 0.5} // Mark as front group
            />
          ))}
        </motion.div>
      ) : (
        <p>No groups available to display.</p>
      )}
    </div>
    // <div className='gallery-container' onWheel={handleWheel}>
    //   {groups.length > 0 ? (
    //     <AnimatePresence mode="wait">
    //       <PictureGroup
    //         key={currentGroupIndex}
    //         group={groups[currentGroupIndex]}
    //         onZoomIn={() => setCurrentGroupIndex((prev) => (prev + 1) % groups.length)}
    //       />
    //     </AnimatePresence>
    //   ) : (
    //     <p>No groups available to display.</p>
    //   )}
    // </div>
  );
};

export default Gallery;
