import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import evolveGrid from "../utils/evolveGrid";
import Grid from "./Grid";
import Controls from "./Controls";

const GameOfLife = ({ rows, columns }) => {
  const [currentGrid, setCurrentGrid] = useState(
    Array.from(Array(rows), () => new Array(columns).fill(0))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepsToAdvance, setStepsToAdvance] = useState(2);
  const [stopAt, setStopAt] = useState(-1);

  const nextGeneration = useCallback(() => {
    const nextGrid = evolveGrid(currentGrid);

    setCurrentStep(currentStep + 1);
    setCurrentGrid(nextGrid);
  }, [currentGrid, currentStep]);

  const handleTogglePlay = () => {
    setStopAt(-1);
    setIsPlaying(!isPlaying);
  };

  const handleAdvanceSteps = () => {
    setStopAt(currentStep + stepsToAdvance);
    setIsPlaying(true);
  };

  useEffect(() => {
    const intervalId = setInterval(nextGeneration, 500);

    if (stopAt > -1 && currentStep >= stopAt) {
      setIsPlaying(false);
    }

    if (!isPlaying) {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentStep, isPlaying, nextGeneration, stopAt]);

  return (
    <>
      <Grid currentGrid={currentGrid} setCurrentGrid={setCurrentGrid} />
      <Controls
        nextGeneration={nextGeneration}
        handleTogglePlay={handleTogglePlay}
        handleAdvanceSteps={handleAdvanceSteps}
        isPlaying={isPlaying}
        stepsToAdvance={stepsToAdvance}
        setStepsToAdvance={setStepsToAdvance}
      />
      <p>Current step: {currentStep}</p>
    </>
  );
};

GameOfLife.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
};

export default GameOfLife;
