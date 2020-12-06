var getInputFileContent = require('../util/readInputFile.js');

const STARTING_POINT = [0,0];

function moveXAxis(currentX, xAxisMax) {
  const nextX = currentX + 3;

  return nextX > xAxisMax
    // Adjusting xAxis overflow
    ? nextX - xAxisMax - 1
    : nextX;
}

function solution(input) {
  let currentX = STARTING_POINT[0];
  const currentY = STARTING_POINT[1];

  let numberOfTrees = 0;
  for(let i = currentY; i < input.length; i++) {

    const xAxis = [...input[i]];

    if (xAxis[currentX] === '#')
      numberOfTrees++;

    currentX = moveXAxis(currentX, xAxis.length - 1);


  }
  return numberOfTrees;
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

