const arr = [
  [-9, -9, -9, 1, 1, 1],
  [0, -9, 0, 4, 3, 2],
  [-9, -9, -9, 1, 2, 3],
  [0, 0, 8, 6, 6, 0],
  [0, 0, 0, -2, 0, 0],
  [0, 0, 1, 2, 4, 0]
];

/*
0, 0
0, 1
0, 2
0, 3 (3 + 3 > 6)

1, 0
1, 1
1, 2
1, 3

*/

const hourglassSum = (arr) => {
  const numberOfRows = arr.length;
  const numberOfColumns = arr[0].length;

  // find hour-glass
  let rowIndex = 0;
  let columnIndex = 0;

  let maxSumMap = new Map();

  while ((rowIndex + 3 <= numberOfRows) || (columnIndex + 3 <= numberOfColumns)) {
    if (columnIndex + 2 >= numberOfColumns) {
      columnIndex = 0;
    }

    let tempSum = 0;

    let offsetColIndex = 0;
    // rowIndex -> 3 columns
    while (offsetColIndex < 3) {
      tempSum += arr[rowIndex][columnIndex + offsetColIndex];
      offsetColIndex += 1;
    }

    offsetColIndex = 0;
    let offsetRowIndex = 2;
    // rowIndex + 2 -> 3 columns
    while (offsetColIndex < 3) {
      tempSum += arr[rowIndex + offsetRowIndex][columnIndex + offsetColIndex];
      offsetColIndex += 1;
    }

    offsetRowIndex = 1;
    offsetColIndex = 1;
    // rowIndex + 1 -> columnIndex + 1
    tempSum += arr[rowIndex + offsetRowIndex][columnIndex + offsetColIndex];

    // store tempSum in map with specified key
    maxSumMap.set(tempSum, `${rowIndex},${columnIndex}`);

    columnIndex += 1;
    if (columnIndex + 2 >= numberOfColumns) {
      rowIndex += 1;
    }
  }

  let maxValue = Number.NEGATIVE_INFINITY;

  for (const value of maxSumMap.keys()) {
    if (value > maxValue) {
      maxValue = value;
    }
  }

  return maxValue;
};



console.log(hourglassSum(arr));

