import React, { useState, useEffect } from "react";
import "../styles/RaceMode.css";
import { bubbleSort, quickSort, selectionSort } from "./sortingAlgorithms";

const sortingAlgorithms = {
  "Bubble Sort": { func: bubbleSort, timeComplexity: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" } },
  "Quick Sort": { func: quickSort, timeComplexity: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)" } },
  "Selection Sort": { func: selectionSort, timeComplexity: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" } },
};

const RaceMode = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [progress, setProgress] = useState({});
  const [arrays, setArrays] = useState({});
  const [comparisons, setComparisons] = useState({});
  const [sortedState, setSortedState] = useState({});
  const [speed, setSpeed] = useState(500);
  const [comparisonCount, setComparisonCount] = useState({});
  const [swapCount, setSwapCount] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [inputType, setInputType] = useState("random");
  const [customArray, setCustomArray] = useState("");

  const generateRandomArray = () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 50));

  const startRace = () => {
    let array = inputType === "random" ? generateRandomArray() : customArray.split(",").map(Number);

    setSortedState({});
    setComparisonCount({});
    setSwapCount({});
    setLeaderboard([]);
    let promises = selectedAlgorithms.map((algo) => runSortingAnimation(algo, array));

    Promise.all(promises).then(() => {
      console.log("🏆 Race Complete!");
    });
  };

  const runSortingAnimation = (algorithm, array) => {
    return new Promise((resolve) => {
      let steps = sortingAlgorithms[algorithm].func(array);
      if (!Array.isArray(steps) || steps.length === 0) {
        console.error(`Error: ${algorithm} did not return valid steps`);
        resolve();
        return;
      }

      let i = 0;
      let comparisons = 0;
      let swaps = 0;

      let interval = setInterval(() => {
        if (i >= steps.length) {
          clearInterval(interval);
          setSortedState((prev) => ({ ...prev, [algorithm]: true }));
          setLeaderboard((prev) => [...prev, { name: algorithm, time: new Date().getTime() }]);
          resolve();
          return;
        }

        comparisons += steps[i]?.compareIndices ? steps[i].compareIndices.length : 0;
        swaps += steps[i]?.swap ? 1 : 0;

        setArrays((prev) => ({
          ...prev,
          [algorithm]: steps[i]?.array ? [...steps[i].array] : prev[algorithm] || [],
        }));

        setComparisons((prev) => ({
          ...prev,
          [algorithm]: steps[i]?.compareIndices ? steps[i].compareIndices : [],
        }));

        setProgress((prev) => ({
          ...prev,
          [algorithm]: ((i + 1) / steps.length) * 100,
        }));

        setComparisonCount((prev) => ({
          ...prev,
          [algorithm]: comparisons,
        }));

        setSwapCount((prev) => ({
          ...prev,
          [algorithm]: swaps,
        }));

        i++;
      }, speed);
    });
  };

  return (
    <div className="race-mode-container">
      <h1>🏁 Algorithm Race Mode 🏆</h1>

      <div className="controls">
        <label>Speed: </label>
        <select onChange={(e) => setSpeed(Number(e.target.value))}>
          <option value={1000}>Slow</option>
          <option value={500} selected>Medium</option>
          <option value={200}>Fast</option>
        </select>
      </div>

      <div className="array-input-selection">
        <label>Array Type: </label>
        <select onChange={(e) => setInputType(e.target.value)}>
          <option value="random">Random</option>
          <option value="custom">User Input</option>
        </select>
      </div>

      {inputType === "custom" && (
        <input
          type="text"
          placeholder="Enter comma-separated numbers"
          onChange={(e) => setCustomArray(e.target.value)}
        />
      )}

      <div className="selection-panel">
        {Object.keys(sortingAlgorithms).map((algo) => (
          <button
            key={algo}
            className={selectedAlgorithms.includes(algo) ? "selected" : ""}
            onClick={() =>
              setSelectedAlgorithms((prev) =>
                prev.includes(algo) ? prev.filter((a) => a !== algo) : [...prev, algo]
              )
            }
          >
            {algo}
          </button>
        ))}
      </div>

      <button onClick={startRace} className="start-button">🚀 Start Race</button>

      <div className="visualization">
        {selectedAlgorithms.map((algo) => (
          <div key={algo} className="algorithm-panel">
            <h3>{algo} {sortedState[algo] ? "✅" : "⏳"}</h3>

            <div className="time-complexity">
              <p>Best: {sortingAlgorithms[algo].timeComplexity.best}</p>
              <p>Average: {sortingAlgorithms[algo].timeComplexity.avg}</p>
              <p>Worst: {sortingAlgorithms[algo].timeComplexity.worst}</p>
            </div>

            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress[algo] || 0}%` }}></div>
            </div>

            <div className="comparison-count">
              Comparisons: {comparisonCount[algo] || 0} | Swaps: {swapCount[algo] || 0}
            </div>

            <div className="array-container">
              {arrays[algo]?.map((val, idx) => (
                <div
                  key={idx}
                  className={`array-bar ${comparisons[algo]?.includes(idx) ? "compare" : ""} ${
                    sortedState[algo] ? "sorted" : ""
                  }`}
                  style={{
                    height: `${val * 5}px`,
                    backgroundColor: comparisons[algo]?.includes(idx) ? "red" : "#5C8374",
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="leaderboard">
        <h2>🏆 Leaderboard 🏆</h2>
        {leaderboard
          .sort((a, b) => a.time - b.time)
          .map((entry, index) => (
            <p key={index}>
              {index + 1}. {entry.name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default RaceMode;
