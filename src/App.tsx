import React, { useState, useEffect } from 'react'
import './App.css'
import Calendar from 'react-calendar'


type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

function App() {
  const [value, setValue] = useState<Value>(new Date())
  const [isUnlocked, unlock] = useState(false)

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const [playerPos, updatePos] = useState({ x: 200, y: 200 })
  const [hoveredTile, setHoveredTile] = useState<HTMLElement | null>(null);

  const specialDate = new Date('2023-12-3')

  const handleActiveStartDateChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date | null;
    value: Value;
    view: string;
  }) => {
    if (activeStartDate) {
      setCurrentMonth(activeStartDate.getMonth());
      setCurrentYear(activeStartDate.getFullYear());
    }
  };
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (date.getMonth() !== currentMonth || date.getFullYear() !== currentYear) {
        return 'neighboring-date'; // Apply custom class to neighboring dates
      }
    }
    return null;
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'e') {
      const tiles = document.querySelectorAll('.react-calendar__tile');
      tiles.forEach((tile) => {
        const rect = tile.getBoundingClientRect();
        if (
          playerPos.x >= rect.left &&
          playerPos.x <= rect.right &&
          playerPos.y >= rect.top &&
          playerPos.y <= rect.bottom
        ) {
          (tile as HTMLElement).click();
        }
      });
    }
    updatePos((prev) => {
      const newPos = { ...prev };
      if (e.key === 'w') newPos.y -= 10;
      if (e.key === 's') newPos.y += 10;
      if (e.key === 'a') newPos.x -= 10;
      if (e.key === 'd') newPos.x += 10;
      return newPos;
    });
  }

  useEffect(() => {
    const handleHover = () => {
      const tiles = document.querySelectorAll('.react-calendar__tile') as NodeListOf<HTMLElement>;
      let hovered: HTMLElement | null = null;

      tiles.forEach((tile) => {
        const rect = tile.getBoundingClientRect();
        if (
          playerPos.x >= rect.left &&
          playerPos.x <= rect.right &&
          playerPos.y >= rect.top &&
          playerPos.y <= rect.bottom
        ) {
          hovered = tile;
        }
      });

      // Safely add highlight
      if (hovered) {
        setHoveredTile(hovered);
        hovered.classList.add('highlighted');
      }

      // Remove highlight from previous tile
      if (hoveredTile && hoveredTile !== hovered) {
        hoveredTile.classList.remove('highlighted');
      }

      // Update hoveredTile state
      if (!hovered) {
        setHoveredTile(null);
      }
    };

    handleHover();
  }, [playerPos, hoveredTile]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [hoveredTile]);

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
    if (newValue instanceof Date && newValue.toDateString() == specialDate.toDateString()) {
      unlock(true);
    } else {
      unlock(false);
    }
  }

  return (
    <div className="app">
      <div className="calendarPuzzle">
        <Calendar onChange={handleDateChange} value={value} showNeighboringMonth={true} tileClassName={tileClassName} onActiveStartDateChange={handleActiveStartDateChange} />
        <div>
          {isUnlocked ? (
            <div>
              <h1>Happy 1 Year My Love &lt;333</h1>
            </div>
          ) : (
            <p style={{ color: 'white', marginTop: '20px' }}>
              Somethings not right...
            </p>
          )}
        </div>
      </div>
      <div
        className="cat"
        style={{
          position: 'absolute',
          left: `${playerPos.x}px`,
          top: `${playerPos.y}px`,
          width: '50px',
          height: '50px',
          backgroundImage: "url('/images/blackcat1.png')",
          backgroundSize: 'cover',
          borderRadius: '50%',
          zIndex: 10,
        }}
      ></div>
    </div>
  )
}

export default App
