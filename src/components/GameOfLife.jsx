import { useState } from "react";
import Cell from "./Cell";

const GameOfLife = ({ rows, columns }) => {
  const createEmptyGrid = () => {
    return Array.from(Array(rows), () => new Array(columns).fill(0));
  };

  const [currentGrid, setCurrentGrid] = useState(createEmptyGrid());

  const nextGeneration = () => {
    const countLiveNeighbors = (rowIndex, colIndex) => {
      const neighbors = [
        currentGrid[rowIndex - 1]?.[colIndex - 1],
        currentGrid[rowIndex - 1]?.[colIndex],
        currentGrid[rowIndex - 1]?.[colIndex + 1],
        currentGrid[rowIndex]?.[colIndex - 1],
        currentGrid[rowIndex]?.[colIndex + 1],
        currentGrid[rowIndex + 1]?.[colIndex - 1],
        currentGrid[rowIndex + 1]?.[colIndex],
        currentGrid[rowIndex + 1]?.[colIndex + 1],
      ];

      const count = neighbors
        .filter((neighbor) => neighbor === 1)
        .reduce((acc, neighbor) => acc + neighbor, 0);

      return count;
    };

    const updateValue = (rowIndex, colIndex) => {
      const currentValue = currentGrid[rowIndex][colIndex];
      const liveNeighbors = countLiveNeighbors(rowIndex, colIndex);

      if (currentValue === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        return 0;
      }
      if (currentValue === 0 && liveNeighbors === 3) {
        return 1;
      }

      return currentValue;
    };

    const nextGrid = currentGrid.map((row, rowIndex) =>
      row.map((_cellValue, colIndex) => updateValue(rowIndex, colIndex))
    );

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
