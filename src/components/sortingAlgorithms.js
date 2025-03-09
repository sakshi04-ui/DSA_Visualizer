export function bubbleSort(arr) {
    let steps = [];
    let newArr = [...arr];
    let n = newArr.length;
    let swapped;
  
    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({ array: [...newArr], compareIndices: [j, j + 1] });
  
        if (newArr[j] > newArr[j + 1]) {
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
          swapped = true;
        }
  
        steps.push({ array: [...newArr], compareIndices: [j, j + 1] });
      }
      if (!swapped) break;
    }
  
    steps.push({ array: [...newArr], compareIndices: [] });
    return steps;
  }
  
  export function quickSort(arr) {
    let steps = [];
    let newArr = [...arr];
  
    function partition(low, high) {
      let pivot = newArr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        steps.push({ array: [...newArr], compareIndices: [j, high] });
  
        if (newArr[j] < pivot) {
          i++;
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
  
        steps.push({ array: [...newArr], compareIndices: [i, j] });
      }
  
      [newArr[i + 1], newArr[high]] = [newArr[high], newArr[i + 1]];
      steps.push({ array: [...newArr], compareIndices: [i + 1, high] });
  
      return i + 1;
    }
  
    function quickSortRecursive(low, high) {
      if (low < high) {
        let pi = partition(low, high);
        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      }
    }
  
    quickSortRecursive(0, newArr.length - 1);
    steps.push({ array: [...newArr], compareIndices: [] });
    return steps;
  }
  
  export function selectionSort(arr) {
    let steps = [];
    let newArr = [...arr];
    let n = newArr.length;
  
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
  
      for (let j = i + 1; j < n; j++) {
        steps.push({ array: [...newArr], compareIndices: [j, minIdx] });
  
        if (newArr[j] < newArr[minIdx]) {
          minIdx = j;
        }
      }
  
      if (minIdx !== i) {
        [newArr[i], newArr[minIdx]] = [newArr[minIdx], newArr[i]];
      }
  
      steps.push({ array: [...newArr], compareIndices: [i, minIdx] });
    }
  
    steps.push({ array: [...newArr], compareIndices: [] });
    return steps;
  }
  