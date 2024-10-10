import { useState } from "react";

const GameOfLife = () => {
  const rows = 5;
  const columns = 15;

  const [grid, setGrid] = useState(
    Array.from(Array(rows), () => new Array(columns).fill(0))
  );

  const nextGeneration = () => {
    const countLiveNeighbors = (rowIndex, colIndex) => {
      const neighbors = [
        grid[rowIndex - 1]?.[colIndex - 1],
        grid[rowIndex - 1]?.[colIndex],
        grid[rowIndex - 1]?.[colIndex + 1],
        grid[rowIndex]?.[colIndex - 1],
        grid[rowIndex]?.[colIndex + 1],
        grid[rowIndex + 1]?.[colIndex - 1],
        grid[rowIndex + 1]?.[colIndex],
        grid[rowIndex + 1]?.[colIndex + 1],
      ];

      const count = neighbors
        .filter((neighbor) => neighbor === 1)
        .reduce((acc, neighbor) => acc + neighbor, 0);

      return count;
    };

    const updateValue = (rowIndex, colIndex) => {
      const currentValue = grid[rowIndex][colIndex];
      const liveNeighbors = countLiveNeighbors(rowIndex, colIndex);

      if (currentValue === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        return 0;
      }
      if (currentValue === 0 && liveNeighbors === 3) {
        return 1;
      }

      return currentValue;
    };

    const nextGrid = grid.map((row, rowIndex) =>
      row.map((_cellValue, colIndex) => updateValue(rowIndex, colIndex))
    );

    setGrid(nextGrid);
  };

  const toggleCell = (rowIndex, colIndex) => {
    const gridCopy = [...grid];
    gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] === 1 ? 0 : 1;

    setGrid(gridCopy);
  };

  return (
    <div>
      <button onClick={nextGeneration} style={{ marginBottom: "30px" }}>
        Next
      </button>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((cellValue, colIndex) => (
            <div
              key={colIndex}
              onClick={() => toggleCell(rowIndex, colIndex)}
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: cellValue === 1 ? "black" : "white",
                border: "1px solid gray",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameOfLife;
