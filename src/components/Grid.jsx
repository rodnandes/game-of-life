import Cell from "./Cell";

const Grid = ({ currentGrid, setCurrentGrid }) => {
  const toggleCell = (rowIndex, colIndex) => {
    const gridCopy = [...currentGrid];
    gridCopy[rowIndex][colIndex] = gridCopy[rowIndex][colIndex] === 1 ? 0 : 1;

    setCurrentGrid(gridCopy);
  };

  return (
    <div style={{ margin: "20px" }}>
      {currentGrid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((value, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              cellValue={value}
              toggleCell={toggleCell}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
