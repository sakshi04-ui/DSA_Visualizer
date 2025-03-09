import React, { useState, useRef } from "react";
import "../styles/searching.css";

const Searching = () => {
  const [searchType, setSearchType] = useState("linear");
  const [arrayType, setArrayType] = useState("random");
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState("");
  const [arraySize, setArraySize] = useState(8);
  const [customArray, setCustomArray] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [executionSteps, setExecutionSteps] = useState([]);
  const [highlightedLines, setHighlightedLines] = useState([]);
  const [leftWidth, setLeftWidth] = useState(30);
  const [middleWidth, setMiddleWidth] = useState(40);
  const [rightWidth, setRightWidth] = useState(30);
  const [arrayMode, setArrayMode] = useState("generated");

  const dragging = useRef(false);

  const handleMouseDown = (divider) => {
    dragging.current = divider;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };


  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    let totalWidth = window.innerWidth * 0.8; // Container width
    let newLeftWidth = leftWidth;
    let newMiddleWidth = middleWidth;
    let newRightWidth = rightWidth;

    if (dragging.current === "left") {
      newLeftWidth = Math.max(15, Math.min(50, (e.clientX / totalWidth) * 100));
      newMiddleWidth = 100 - newLeftWidth - rightWidth;
    } else if (dragging.current === "right") {
      newRightWidth = Math.max(15, Math.min(50, ((totalWidth - e.clientX) / totalWidth) * 100));
      newMiddleWidth = 100 - leftWidth - newRightWidth;
    }

    setLeftWidth(newLeftWidth);
    setMiddleWidth(newMiddleWidth);
    setRightWidth(newRightWidth);
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  
  // 🔹 Search Algorithm Descriptions
  const searchDescriptions = {
    linear: (
      <>
        <h2 style={{ textAlign: "center" }}>Linear Search</h2>
        <p>
          <strong>Definition:</strong> Linear Search is a simple searching algorithm that
          checks each element of the array one by one until the target element is found or
          the end of the array is reached.
        </p>
  
        <h3>How It Works:</h3>
        <ol>
          <li>Start from the first element of the array.</li>
          <li>Compare each element with the target.</li>
          <li>If a match is found, return the index.</li>
          <li>If the element is not found, return -1.</li>
        </ol>
  
        <h3>Time Complexity:</h3>
        <ul>
          <li><strong>Best Case (O(1)):</strong> The element is found at the first position.</li>
          <li><strong>Worst Case (O(n)):</strong> The element is at the last position or not present.</li>
          <li><strong>Average Case (O(n)):</strong> On average, half of the elements are checked before finding the target.</li>
        </ul>
  
        <h3>Space Complexity:</h3>
        <p><strong>O(1)</strong> - No extra memory is required apart from a few variables.</p>
  
        <h3>Advantages:</h3>
        <ul>
          <li>Simple and easy to implement.</li>
          <li>Works on both sorted and unsorted data.</li>
          <li>Requires no extra memory.</li>
        </ul>
  
        <h3>Disadvantages:</h3>
        <ul>
          <li>Slow for large datasets.</li>
          <li>Inefficient compared to Binary Search for sorted arrays.</li>
        </ul>
      </>
    ),
  
    binary: (
      <>
        <h2 style={{ textAlign: "center" }}>Binary Search</h2>
        <p>
          <strong>Definition:</strong> Binary Search is a fast searching algorithm that works
          on sorted arrays by repeatedly dividing the search range in half.
        </p>
  
        <h3>How It Works:</h3>
        <ol>
          <li>Find the middle element of the array.</li>
          <li>Compare the middle element with the target.</li>
          <li>If the middle element is the target, return its index.</li>
          <li>If the target is smaller, search in the left half.</li>
          <li>If the target is larger, search in the right half.</li>
          <li>Repeat this process until the element is found or the range becomes empty.</li>
        </ol>
  
        <h3>Time Complexity:</h3>
        <ul>
          <li><strong>Best Case (O(1)):</strong> The target is found at the middle index on the first check.</li>
          <li><strong>Worst Case (O(log n)):</strong> The search range reduces by half in each step.</li>
          <li><strong>Average Case (O(log n)):</strong> The element is found after log(n) divisions.</li>
        </ul>
  
        <h3>Space Complexity:</h3>
        <p><strong>O(1)</strong> - Binary search uses only a few extra variables (left, right, mid).</p>
  
        <h3>Advantages:</h3>
        <ul>
          <li>Much faster than Linear Search for large datasets.</li>
          <li>Efficient with a time complexity of O(log n).</li>
        </ul>
  
        <h3>Disadvantages:</h3>
        <ul>
          <li>Works only on sorted arrays.</li>
          <li>Requires additional steps for inserting/deleting elements in a sorted array.</li>
        </ul>
      </>
    ),
  };
  
    // 🔹 Search Algorithm Code
  const searchCode = {
    linear: [
      "function search(arr, n, x)",
      "{",
        "for (let i = 0; i < n; i++)",
          "if (arr[i] == x)",
              "return i;",
      "return -1;",
    "}",
    ],
    binary: [
      "function binarySearch(arr, x)",
"{",
    "let low = 0;",
    "let high = arr.length - 1;",
    "let mid;",
    "while (high >= low) {",
        "mid = low + Math.floor((high - low) / 2);",

        "// If the element is present at the middle",
        "// itself",
        "if (arr[mid] == x)",
            "return mid;",

        "// If element is smaller than mid, then",
        "// it can only be present in left subarray",
            "high = mid - 1;",

        "// Else the element can only be present",
        "// in right subarray",
        "else:",
          "low = mid + 1;",
    "}",

    "// We reach here when element is not",
    "// present in array",
    "return -1;",
"}",
    ],
  };

// Generate Random Array
const generateRandomArray = () => {
  const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100))
    .sort((a, b) => a - b); // Sorting in ascending order

  setArray(newArray);
  setCurrentIndex(-1);
};


// Set User Custom Array in Sorted Order
const handleCustomArray = () => {
  const newArray = customArray
    .split(",")
    .map(num => parseInt(num.trim(), 10))
    .filter(num => !isNaN(num))
    .sort((a, b) => a - b); // Sort in ascending order

  setArray(newArray);
  setCurrentIndex(-1);
};

  // 🔹 Linear Search Execution
  const linearSearch = (target) => {
    setExecutionSteps([]);
    setHighlightedLines([]);
    let steps = [];
    let i = 0;

    const stepSearch = () => {
      if (i >= array.length) {
        steps.push(`❌ ${target} Not Found`);
        setExecutionSteps([...steps]);
        return;
      }

      setCurrentIndex(i);
      setHighlightedLines([0]);

      steps.push(`🔎 Checking index ${i}: ${array[i]}`);
      setExecutionSteps([...steps]);

      setTimeout(() => {
        if (array[i] === target) {
          steps.push(`✅ Found ${target} at index ${i}`);
          setExecutionSteps([...steps]);
          setHighlightedLines([1]);
        } else {
          i++;
          stepSearch();
        }
      }, 800);
    };

    stepSearch();
  };

  // 🔹 Binary Search Execution
  const binarySearch = (target) => {
    setExecutionSteps([]);
    setHighlightedLines([]);
    let left = 0, right = array.length - 1;
    let steps = [];

    const stepSearch = () => {
      if (left > right) {
        steps.push(`❌ ${target} Not Found`);
        setExecutionSteps([...steps]);
        return;
      }

      let mid = Math.floor((left + right) / 2);
      setCurrentIndex(mid);
      setHighlightedLines([2]);

      steps.push(`🔎 Checking mid index ${mid}: ${array[mid]}`);
      setExecutionSteps([...steps]);

      setTimeout(() => {
        if (array[mid] === target) {
          steps.push(`✅ Found ${target} at index ${mid}`);
          setExecutionSteps([...steps]);
          setHighlightedLines([3]);
        } else if (array[mid] < target) {
          left = mid + 1;
          stepSearch();
        } else {
          right = mid - 1;
          stepSearch();
        }
      }, 800);
    };

    stepSearch();
  };

  const handleSearch = () => {
    setCurrentIndex(null);
    setExecutionSteps([]);
    if (searchType === "linear") {
      linearSearch(parseInt(target));
    } else {
      binarySearch(parseInt(target));
    }
  };

  return (
    <div className="searching-container">
      <div className="visualizer-section" style={{ display: "flex", width: "100%" }}>
        {/* LEFT: Theory Section */}
        <div className="theory-section" style={{ width: `${leftWidth}%` }}>
          <h2>Search Algorithm</h2>
          <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="linear">Linear Search</option>
            <option value="binary">Binary Search</option>
          </select>
          <div>{searchDescriptions[searchType]}</div>
        </div>

        {/* Left Divider */}
        <div className="divider" onMouseDown={() => handleMouseDown("left")}></div>

        {/* MIDDLE: Code & Execution Section */}
        <div className="code-execution" style={{ width: `${middleWidth}%` }}>
          <h2>Code Execution</h2>
          <div className="code-box">
            {searchCode[searchType].map((line, index) => (
              <div key={index} className={`code-line ${highlightedLines.includes(index) ? "active" : ""}`}>
                {line}
              </div>
            ))}
          </div>

          <h2>Execution Steps</h2>
          <div className="execution-box">
            {executionSteps.map((step, index) => <p key={index}>{step}</p>)}
          </div>
        </div>

        {/* Right Divider */}
        <div className="divider" onMouseDown={() => handleMouseDown("right")}></div>

        {/* RIGHT: Array Visualization Section */}
        <div className="array-section" style={{ width: `${rightWidth}%` }}>
          <h2>Array Visualization</h2>
          <select value={arrayMode} onChange={(e) => setArrayMode(e.target.value)}>
            <option value="generated">User-Generated Array</option>
            <option value="custom">User Input Array</option>
          </select>

          {arrayMode === "generated" && (
            <>
              <button onClick={generateRandomArray}>Generate Random Array</button>
              <input type="number" value={arraySize} onChange={(e) => setArraySize(e.target.value)} />
            </>
          )}

          {arrayMode === "custom" && (
            <>
              <input
                type="text"
                value={customArray}
                onChange={(e) => setCustomArray(e.target.value)}
                placeholder="Enter comma-separated numbers"
              />
              <button onClick={handleCustomArray}>Set Custom Array</button>
            </>
          )}

          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter number"
          />
          <button onClick={handleSearch}>Search</button>

          <div className="array-container">
            {array.map((num, index) => (
              <div key={index} className={`array-bar ${index === currentIndex ? "active" : ""}`}>
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searching;