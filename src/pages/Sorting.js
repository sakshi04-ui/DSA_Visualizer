import React, { useState, useEffect } from "react";
import "../styles/Sorting.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");

  useEffect(() => {
    generateNewArray();
  }, []);

  const generateNewArray = () => {
    if (sorting) return;

    let newArr = userInput
      ? userInput.split(",").map((num) => parseInt(num.trim())).filter(num => !isNaN(num))
      : Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));

    setArray(newArr);
    setActiveIndexes([]);
    setExecutionSteps([]);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    let steps = [];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndexes([j, j + 1]);
        steps.push(`Comparing ${arr[j]} and ${arr[j + 1]}`);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          steps.push(`Swapped ${arr[j]} and ${arr[j + 1]}`);
          await sleep(300);
        }
      }
    }
    setExecutionSteps([...steps]);
    setActiveIndexes([]);
    setSorting(false);
  };

  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];
    let steps = [];

    for (let i = 0; i < arr.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        setActiveIndexes([j, minIndex]);
        steps.push(`Comparing ${arr[j]} and ${arr[minIndex]}`);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        steps.push(`Swapped ${arr[i]} and ${arr[minIndex]}`);
        await sleep(300);
      }
    }

    setExecutionSteps([...steps]);
    setActiveIndexes([]);
    setSorting(false);
  };

  const startSorting = () => {
    if (sorting) return;
    setExecutionSteps([]);
    if (selectedAlgorithm === "bubbleSort") bubbleSort();
    else if (selectedAlgorithm === "selectionSort") selectionSort();
  };

  const algorithmTheory = {
    bubbleSort: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Time Complexity: O(n²).",
    selectionSort: "Selection Sort is a sorting algorithm that selects the smallest element from an unsorted list in each iteration and swaps it with the beginning. Time Complexity: O(n²)."
  };

  return (
    <div className="sorting-container">
      {/* Sorting Algorithm Section */}
      <div className="section">
        <h2>Sorting Algorithm</h2>
        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="selectionSort">Selection Sort</option>
        </select>
        <div className="algorithm-theory">{algorithmTheory[selectedAlgorithm]}</div>
      </div>

      {/* Code Execution Section */}
      <div className="section code-section">
        <h2>Code Execution</h2>
        <pre>
          {selectedAlgorithm === "bubbleSort"
            ? `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n}`
            : `function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let minIndex = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[minIndex]) {\n        minIndex = j;\n      }\n    }\n    if (minIndex !== i) {\n      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];\n    }\n  }\n}`}
        </pre>
        <h3>Execution Steps</h3>
        <div className="execution-box">
          {executionSteps.length === 0 ? <p>No steps yet.</p> : executionSteps.map((step, index) => <p key={index}>{step}</p>)}
        </div>
      </div>

      {/* Array Visualization Section */}
      <div className="section">
        <h2>Array Visualization</h2>
        <input
          type="text"
          placeholder="Enter numbers, e.g., 5,12,3,8"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={generateNewArray} disabled={sorting}>Generate New Array</button>
        <button onClick={startSorting} disabled={sorting}>Start Sorting</button>

        <div className="array-container">
          {array.map((value, index) => (
            <div
              key={index}
              className={`array-bar ${activeIndexes.includes(index) ? "active" : ""}`}
              style={{ height: `${value * 3}px` }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;