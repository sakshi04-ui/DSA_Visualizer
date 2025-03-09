import React, { useState, useEffect } from "react";
import "../styles/Sorting.css";

const SortingVisualizer = ({ algorithm }) => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [sorting, setSorting] = useState(false);
  const [currentIndices, setCurrentIndices] = useState([]);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [highlightedLines, setHighlightedLines] = useState([]);

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
  };

  useEffect(() => generateArray(), [arraySize]);

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    let steps = [];
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setCurrentIndices([j, j + 1]);
        steps.push(`Comparing ${arr[j]} and ${arr[j + 1]}`);
        setExecutionSteps([...steps]);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          steps.push(`Swapped ${arr[j + 1]} and ${arr[j]}`);
          setExecutionSteps([...steps]);
        }
      }
    }
    setSorting(false);
    setCurrentIndices([]);
  };

  // Insertion Sort Algorithm
  const insertionSort = async () => {
    setSorting(true);
    let arr = [...array];
    let steps = [];
    
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      
      while (j >= 0 && arr[j] > key) {
        setCurrentIndices([j, j + 1]);
        steps.push(`Comparing ${arr[j]} and ${key}`);
        setExecutionSteps([...steps]);
        
        arr[j + 1] = arr[j];
        setArray([...arr]);
        await new Promise(resolve => setTimeout(resolve, 300));
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setSorting(false);
    setCurrentIndices([]);
  };

  return (
    <div className="sorting-visualizer">
      <div className="controls">
        <input
          type="number"
          value={arraySize}
          onChange={(e) => setArraySize(e.target.value)}
          disabled={sorting}
        />
        <button onClick={generateArray} disabled={sorting}>
          Generate New Array
        </button>
        <button 
          onClick={algorithm === 'bubble' ? bubbleSort : insertionSort} 
          disabled={sorting}
        >
          {algorithm === 'bubble' ? 'Bubble Sort' : 'Insertion Sort'}
        </button>
      </div>

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="array-bar"
            style={{
              height: `${value}%`,
              backgroundColor: currentIndices.includes(idx) ? '#ff0000' : '#9EC8B9'
            }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="execution-steps">
        {executionSteps.map((step, idx) => (
          <div key={idx} className="step">
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;