export function binarySearch(arr, target, callback) {
    let steps = [];
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        steps.push({ index: mid, value: arr[mid], found: arr[mid] === target });
        if (arr[mid] === target) break;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    callback(steps);
}