import { useState } from "react";
import Cell from "./Cell";
import evolveGrid from "../utils/evolveGrid";

const GameOfLife = ({ rows, columns }) => {
  const createEmptyGrid = () => {
    return Array.from(Array(rows), () => new Array(columns).fill(0));
  };

  const [currentGrid, setCurrentGrid] = useState(createEmptyGrid());

  const nextGeneration = () => {
    const nextGrid = evolveGrid(currentGrid);

    setCurrentGrid(nextGrid);
  };

  const toggleCell = (rowIndex, colIndex) => {
    const gridCopy = [...currentGrid];
    gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] === 1 ? 0 : 1;

    setCurrentGrid(gridCopy);
  };

  return (
    <div>
      <button onClick={nextGeneration} style={{ marginBottom: "30px" }}>
        Next
      </button>
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
  );
};

export default GameOfLife;
