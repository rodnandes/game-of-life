import PropTypes from "prop-types";

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

Cell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  cellValue: PropTypes.number.isRequired,
  toggleCell: PropTypes.func.isRequired,
};

export default Cell;
