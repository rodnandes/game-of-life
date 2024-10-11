const Controls = ({
  nextGeneration,
  handleTogglePlay,
  handleAdvanceSteps,
  isPlaying,
  stepsToAdvance,
  setStepsToAdvance,
}) => (
  <>
    <div>
      <button onClick={nextGeneration}>Next State</button>
      <button onClick={handleTogglePlay}>{isPlaying ? "Stop" : "Play"}</button>
      <button onClick={handleAdvanceSteps}>
        Advance {stepsToAdvance} steps
      </button>
    </div>
    <div>
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
    </div>
  </>
);

export default Controls;
