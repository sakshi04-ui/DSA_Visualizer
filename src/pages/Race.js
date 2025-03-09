import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import bubbleSort from "../algorithms/bubbleSort";
import quickSort from "../algorithms/quickSort";
import mergeSort from "../algorithms/mergeSort";

const Race = () => {
  const [algorithms, setAlgorithms] = useState([
    { name: "Bubble Sort", fn: bubbleSort, time: 0 },
    { name: "Quick Sort", fn: quickSort, time: 0 },
    { name: "Merge Sort", fn: mergeSort, time: 0 },
  ]);
  const [array, setArray] = useState([]);
  const [raceStarted, setRaceStarted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    let newArray = Array.from({ length: 50 }, () =>
      Math.floor(Math.random() * 500)
    );
    setArray(newArray);
  };

  const startRace = async () => {
    setRaceStarted(true);
    let results = [];

    for (let algo of algorithms) {
      let arrCopy = [...array];
      let start = performance.now();
      await algo.fn(arrCopy);
      let end = performance.now();
      let executionTime = end - start;

      results.push({ ...algo, time: executionTime });
    }

    results.sort((a, b) => a.time - b.time);
    setLeaderboard(results);
    setAlgorithms(results);
  };

  return (
    <div className="p-6 bg-[#092635] text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Algorithm Race Mode</h1>
      
      <div className="flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-[#1B4242] rounded-md"
          onClick={generateArray}
          disabled={raceStarted}
        >
          Generate New Array
        </button>
        <button
          className="px-4 py-2 bg-[#5C8374] rounded-md"
          onClick={startRace}
          disabled={raceStarted}
        >
          Start Race
        </button>
      </div>

      <div className="mt-6">
        {algorithms.map((algo, index) => (
          <motion.div
            key={algo.name}
            className="mb-4 bg-[#1B4242] p-4 rounded-md shadow-md"
            animate={{ width: `${(algo.time / algorithms[algorithms.length - 1].time) * 100}%` }}
            transition={{ duration: 1 }}
          >
            <span className="text-lg">{algo.name}</span>
            <div className="w-full bg-gray-700 h-4 mt-2 rounded-md">
              <motion.div
                className="h-4 bg-[#9EC8B9] rounded-md"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: algo.time / 1000 }}
              ></motion.div>
            </div>
            <p className="mt-2">Execution Time: {algo.time.toFixed(2)} ms</p>
          </motion.div>
        ))}
      </div>

      {leaderboard.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
          <Bar
            data={{
              labels: leaderboard.map((algo) => algo.name),
              datasets: [
                {
                  label: "Execution Time (ms)",
                  data: leaderboard.map((algo) => algo.time),
                  backgroundColor: "#5C8374",
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Race;
