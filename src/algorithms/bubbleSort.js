const bubbleSort = async (arr, updateProgress) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate delay
        updateProgress();
      }
    }
  }
  return arr;
};

export default bubbleSort;
