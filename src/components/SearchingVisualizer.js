import React, { useState } from "react";
import "../styles/searching.css";

const SearchingVisualizer = ({ onStepUpdate, onCodeUpdate }) => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(8);
  const [target, setTarget] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [searchingType, setSearchingType] = useState("linear");

  // Generate a random sorted array
  const generateRandomArray = () => {
    let newArr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(newArr.sort((a, b) => a - b)); // Sort for Binary Search
  };

  // Handle user input for the array
  const handleArrayChange = (e) => {
    let values = e.target.value
      .split(",")
      .map((num) => parseInt(num.trim()))
      .filter((num) => !isNaN(num));
    setArray(values.sort((a, b) => a - b));
  };

  // Update the message displayed to the user
  const updateResultMessage = (message, isSuccess) => {
    const resultMessage = isSuccess ? `✅ ${message}` : `❌ ${message}`;
    onStepUpdate(resultMessage);
  };

  // Code for highlighting step-by-step execution
  const linearSearchCode = [
    { code: "for (let i = 0; i < array.length; i++) {", highlight: false },
    { code: "    if (array[i] === target) return i;", highlight: false },
    { code: "}", highlight: false },
    { code: "return -1;", highlight: false },
  ];
  
  const binarySearchCode = [
    { code: "let left = 0, right = array.length - 1;", highlight: false },
    { code: "while (left <= right) {", highlight: false },
    { code: "    let mid = Math.floor((left + right) / 2);", highlight: false },
    { code: "    if (array[mid] === target) return mid;", highlight: false },
    { code: "    else if (array[mid] < target)", highlight: false },
    { code: "        left = mid + 1;", highlight: false },
    { code: "    else", highlight: false },
    { code: "        right = mid - 1;", highlight: false },
    { code: "}", highlight: false },
    { code: "return -1;", highlight: false },
  ];

  const handleSearch = () => {
    setCurrentIndex(null);
    onStepUpdate("");

    if (searchingType === "linear") {
      onCodeUpdate(linearSearchCode);
      linearSearch(parseInt(target));
    } else {
      onCodeUpdate(binarySearchCode);
      binarySearch(parseInt(target));
    }
  };

  // Update code highlight based on the line number
  const updateCodeHighlight = (lineNumber) => {
    const code = searchingType === "linear" ? linearSearchCode : binarySearchCode;
    code.forEach((line, index) => {
      line.highlight = index === lineNumber;
    });
    onCodeUpdate([...code]);
  };

  // Linear Search with Visualization
  const linearSearch = (target) => {
    let i = 0;

    const searchStep = () => {
      if (i >= array.length) {
        updateResultMessage(`${target} Not Found ❌`, false);
        return;
      }

      setCurrentIndex(i);
      updateCodeHighlight(0);
      onStepUpdate(`🔎 Checking index ${i}: ${array[i]}`);

      setTimeout(() => {
        if (array[i] === target) {
          updateResultMessage(`✅ Found ${target} at index ${i}`, true);
          updateCodeHighlight(1);
        } else {
          i++;
          searchStep();
        }
      }, 800);
    };

    searchStep();
  };

  // Binary Search with Visualization
  const binarySearch = (target) => {
    let left = 0, right = array.length - 1;

    const searchStep = () => {
      if (left > right) {
        updateResultMessage(`${target} Not Found ❌`, false);
        return;
      }

      let mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      updateCodeHighlight(2);
      onStepUpdate(`🔎 Checking mid index ${mid}: ${array[mid]}`);

      setTimeout(() => {
        if (array[mid] === target) {
          updateResultMessage(`✅ Found ${target} at index ${mid}`, true);
          updateCodeHighlight(3);
        } else if (array[mid] < target) {
          left = mid + 1;
          updateCodeHighlight(4);
          searchStep();
        } else {
          right = mid - 1;
          updateCodeHighlight(5);
          searchStep();
        }
      }, 800);
    };

    searchStep();
  };

  return (
    <div className="visualizer">
      {/* Array Input Section */}
      <div className="array-input">
        <label>Enter Array (comma-separated) or</label>
        <input
          type="text"
          onChange={handleArrayChange}
          placeholder="e.g. 5, 10, 15, 20"
        />
        <label>Size: </label>
        <input
          type="number"
          value={arraySize}
          onChange={(e) => setArraySize(e.target.value)}
          min="1"
          max="20"
        />
        <button onClick={generateRandomArray}>Generate Random Array</button>
      </div>

      {/* Array Display */}
      <div className="array-container">
        {array.map((num, index) => (
          <div
            key={index}
            className={`array-bar ${index === currentIndex ? "active" : ""}`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Search Controls */}
      <div className="controls">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Enter number"
        />
        <select onChange={(e) => setSearchingType(e.target.value)}>
          <option value="linear">Linear Search</option>
          <option value="binary">Binary Search</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchingVisualizer;
