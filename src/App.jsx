import GameOfLife from "./components/GameOfLife";

import "./App.css";

function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Conway&apos;s Game of Life</h1>
      <GameOfLife rows={20} columns={40} />
    </div>
  );
}

export default App;
