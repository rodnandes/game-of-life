const Cell = ({ rowIndex, colIndex, cellValue, toggleCell }) => (
  <div
    onClick={() => toggleCell(rowIndex, colIndex)}
    style={{
      width: "25px",
      height: "25px",
      backgroundColor: cellValue === 1 ? "black" : "white",
      border: "1px solid gray",
      cursor: "pointer",
    }}
  />
);

export default Cell;
