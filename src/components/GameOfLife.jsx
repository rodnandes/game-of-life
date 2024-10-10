import { useEffect, useState, useCallback } from "react";
import Cell from "./Cell";
import evolveGrid from "../utils/evolveGrid";

const GameOfLife = ({ rows, columns }) => {
  const createEmptyGrid = () => {
    return Array.from(Array(rows), () => new Array(columns).fill(0));
  };

  const [currentGrid, setCurrentGrid] = useState(createEmptyGrid());
  const [isPlaying, setIsPlaying] = useState(false);

  const nextGeneration = useCallback(() => {
    const nextGrid = evolveGrid(currentGrid);

    setCurrentGrid(nextGrid);
  }, [currentGrid]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const intervalId = setInterval(nextGeneration, 500);

    if (!isPlaying) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, nextGeneration]);

  const toggleCell = (rowIndex, colIndex) => {
    const gridCopy = [...currentGrid];
    gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] === 1 ? 0 : 1;

    setCurrentGrid(gridCopy);
  };

  return (
    <>
      <div style={{ marginBottom: "30px" }}>
        <button onClick={nextGeneration}>Next State</button>
        <button onClick={togglePlay}>{isPlaying ? "Stop" : "Play"}</button>
      </div>
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
    </>
  );
};

export default GameOfLife;
