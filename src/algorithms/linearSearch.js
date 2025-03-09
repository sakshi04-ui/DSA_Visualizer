export function linearSearch(arr, target, callback) {
  let steps = [];
  for (let i = 0; i < arr.length; i++) {
      steps.push({ index: i, value: arr[i], found: arr[i] === target });
      if (arr[i] === target) break;
  }
  callback(steps);
}