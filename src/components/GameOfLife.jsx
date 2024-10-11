import { useEffect, useState, useCallback } from "react";
import Cell from "./Cell";
import evolveGrid from "../utils/evolveGrid";

const GameOfLife = ({ rows, columns }) => {
  const createEmptyGrid = () => {
    return Array.from(Array(rows), () => new Array(columns).fill(0));
  };

  const [currentGrid, setCurrentGrid] = useState(createEmptyGrid());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsToAdvance, setStepsToAdvance] = useState(2);
  const [stopAt, setStopAt] = useState(-1);

  const nextGeneration = useCallback(() => {
    const nextGrid = evolveGrid(currentGrid);

    setCurrentStep(currentStep + 1);
    setCurrentGrid(nextGrid);
  }, [currentGrid, currentStep]);

  const togglePlay = () => {
    setStopAt(-1);
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const intervalId = setInterval(nextGeneration, 500);

    if (stopAt > -1 && currentStep >= stopAt) {
      setIsPlaying(false);
    }

    if (!isPlaying) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentStep, isPlaying, nextGeneration, stopAt]);

  const toggleCell = (rowIndex, colIndex) => {
    const gridCopy = [...currentGrid];
    gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] === 1 ? 0 : 1;

    setCurrentGrid(gridCopy);
  };

  const handleAdvanceSteps = () => {
    setStopAt(currentStep + stepsToAdvance);
    setIsPlaying(true);
  };

  return (
    <>
      <div style={{ margin: "20px" }}>
        {createEmptyGrid().map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((_, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                cellValue={currentGrid[rowIndex][colIndex]}
                toggleCell={toggleCell}
              />
            ))}
          </div>
        ))}
      </div>
      <div>
        <button onClick={nextGeneration}>Next State</button>
        <button onClick={togglePlay}>{isPlaying ? "Stop" : "Play"}</button>
        <button onClick={handleAdvanceSteps}>
          Advance {stepsToAdvance} steps
        </button>
      </div>
      <label>
        Auto advance steps:
        <input
          type="number"
          min="2"
          max="1000"
          step="1"
          value={stepsToAdvance}
          onChange={(e) => setStepsToAdvance(Number(e.target.value))}
        />
      </label>
      <p>Current step: {currentStep}</p>
    </>
  );
};

export default GameOfLife;
