var getInputFileContent = require('../util/readInputFile.js');

const STARTING_POINT = [0,0];

function moveXAxis(currentX, xAxisMax, ammount) {
  const nextX = currentX + ammount;

  return nextX > xAxisMax
    // Adjusting xAxis overflow
    ? nextX - xAxisMax - 1
    : nextX;
}

function solution(input) {
  const moves = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const trees = moves.map(move => {
    let currentX = STARTING_POINT[0];
    const currentY = STARTING_POINT[1];

    let numberOfTrees = 0;
    for(let i = currentY; i < input.length; i = i + move[1]) {

      const xAxis = [...input[i]];

      if (xAxis[currentX] === '#')
        numberOfTrees++;

      currentX = moveXAxis(currentX, xAxis.length - 1, move[0]);
    }
    return numberOfTrees
  });

  return trees.reduce((acc, numOfTrees) => {
    return acc === 0 ? numOfTrees : acc * numOfTrees;
  }, 0);
}

function main() {
  const fileName = process.argv[2];
  if (!fileName)
    return null;

  getInputFileContent(fileName, __dirname, function(fileContent) {
    const result = solution(fileContent);
    console.log(result);
  });
}

main()

