// src/Gallery.tsx
import React, { useState, WheelEvent, useEffect } from 'react';
// import { AnimatePresence, transform } from 'framer-motion';
import { motion } from 'framer-motion';
import PictureGroup from './PictureGroup.tsx';
import { Group } from './types';
import './styles.css'

const Gallery: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  // const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const SCROLL_AMOUNT = 500;
  const SLOW_SCROLL_AMOUNT = 2000;
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
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const staticGroups: Group[] = [
      {
        label: 'December 2023',
        pictures: [
          { src: './images/dec1.jpg', caption: 'Our first date in Peddlers after becoming official. Your so freaking cute <3' },
          { src: './images/dec2.jpg', caption: 'Asking strangers to take photos was so awkward at this time. We were really young lol' }
        ],
      },

      {
        label: 'January 2024',
        pictures: [
          { src: './images/jan1.jpg', caption: 'I honestly loved hanging out at random places over winter break' },
          { src: './images/jan2.jpg', caption: 'You being iconic and cute again :33' }
        ],
      },
      {
        label: 'Febuary 2024',
        pictures: [
          { src: './images/feb1.jpg', caption: 'Back when I didnt know this resturant was hella overpriced... still was a really fun date' },
          { src: './images/feb2.jpg', caption: 'You in your fortnite era bruh. On our valentines day date...' },
          { src: './images/feb3.jpg', caption: 'Dont care your so frigging cute <33333' }
        ],
      },
      {
        label: 'March 2024',
        pictures: [
          { src: './images/march1.jpg', caption: 'Lowkey we are slaying here peak fashion?' },
          { src: './images/march2.jpg', caption: 'This was the month I realized we fit so well together' },
          { src: './images/march3.jpg', caption: 'Bruh i have like one face for photos. Ur so pretty tho :3' }
        ],
      },
      {
        label: 'April 2024',
        pictures: [
          { src: './images/april1.jpg', caption: 'First time I saw an eclipse with friends! and you my love' },
          { src: './images/april2.jpg', caption: 'We revisited the overpriced mid mexican resturant... its ok cause UR HOT AF' }
        ],
      },
      {
        label: 'May 2024',
        pictures: [
          { src: './images/may1.jpg', caption: 'End of school. OMG I WAS SO EXCITED FOR SUMMER' },
          { src: './images/may2.jpg', caption: 'Did I mention you are so cute' },
          { src: './images/may3.jpg', caption: 'First time I used a photobooth actually, and my favorite time' },
          { src: './images/may4.jpg', caption: 'Aquarium Date!!!! Like high key W date lol sry for being super horny' }
        ],
      },
      {
        label: 'June 2024',
        pictures: [
          { src: './images/june1.jpg', caption: 'Never had so much fun at the beach and boardwalk <3' },
          { src: './images/june2.jpg', caption: 'When we wolfed down so much food bruh in Doylestown' },
          { src: './images/june3.jpg', caption: 'CUTEEEEEEEE <333' }
        ],
      },
      {
        label: 'July 2024',
        pictures: [
          { src: './images/july1.jpg', caption: 'July 4th weekend :3. NOT SHOWING MY HAIRCUT PHOTOS' },
          { src: './images/july2.jpg', caption: 'Another W beach trip we look so goood' }
        ],
      },
      {
        label: 'August 2024',
        pictures: [
          { src: './images/august1.jpg', caption: 'oh myyyyyy.... im ovulating' },
          { src: './images/august2.jpg', caption: 'W DATE SPOOTT' },
          { src: './images/august3.jpg', caption: 'These lights were so fun and the fair in general was so cool' },
          { src: './images/august4.jpg', caption: 'We didnt take any photos of us together at the museum :(... you looked amazing tho. We should go again and pretend to know history again LOL' }
        ],
      },
      {
        label: 'September 2024',
        pictures: [
          { src: './images/sep1.jpg', caption: 'Mewinggggg. Even though we were fighting a lot during this month, I was still so in love with you' },
          { src: './images/sep2.jpg', caption: 'Texas Roadhouse :3 ur buns or their buns.... (ofc urs)' }
        ],
      },
      {
        label: 'October 2024',
        pictures: [
          { src: './images/oct1.jpg', caption: 'Yea i remember yapping about leaving lambdas and pouring fucking chick-fil-a sauce every LOL. i love you' },
          { src: './images/oct2.jpg', caption: 'I love you. Damn you slayyyyed' },
        ],
      },
      {
        label: 'November 2024',
        pictures: [
          { src: './images/nov1.jpg', caption: 'We slayyyed. We gotta do more costumes tbh' },
          { src: './images/nov2.jpg', caption: 'I loveee youuu. I cant wait to make more memories with you <3' },
        ],
      },
      {
        label: 'the future <3 lets make more memories together, my poat',
        pictures: [
        ],
      },
    ];
    setGroups(staticGroups); // Use static data lol aint doing fetching shit
  }, []);
  const progressPercentage = Math.min(
    Math.max((scrollProgress / (groups.length - 1)) * 100, 0),
    100
  );

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
      {groups.length > 0 ? (
        <>
          <motion.div
            className="group-wrapper"
            style={{
              transform: `translateZ(${scrollProgress * -500
                }px)`, // Adjust position based on progress
            }}
          >
            {groups.map((group, index) => (
              <PictureGroup
                key={index}
                group={group}
                progress={scrollProgress - index}
                direction={scrollDirection}
                isFront={Math.abs(scrollProgress - index) < 0.5} // Mark as front group
                cursorPos={cursorPos}
              />
            ))}
          </motion.div>
          <motion.div
            className="progress-bar-container"
            style={{
              transform: `perspective(1000px) rotateY(0deg) translateY(-50px)`
            }}
          >
            <motion.div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </motion.div>
        </>
      ) : (
        <p>No groups available to display.</p>
      )}
    </div>
  );
};

export default Gallery;
