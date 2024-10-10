const evolveGrid = (grid) => {
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

  const shouldLive = (currentValue, liveNeighbors) => {
    if (currentValue === 1) {
      return liveNeighbors === 2 || liveNeighbors === 3;
    }
    return liveNeighbors === 3;
  };

  const updateValue = (rowIndex, colIndex) => {
    const currentValue = grid[rowIndex][colIndex];
    const liveNeighbors = countLiveNeighbors(rowIndex, colIndex);

    return shouldLive(currentValue, liveNeighbors) ? 1 : 0;
  };

  const nextGrid = grid.map((row, rowIndex) =>
    row.map((_cellValue, colIndex) => updateValue(rowIndex, colIndex))
  );

  return nextGrid;
};

export default evolveGrid;
