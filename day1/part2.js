var getInputFileContent = require('../util/readInputFile.js');

function solution(input) {
  for(let i = 0; i < input.length; i++) {
    const firstNumber = Number(input[i]);

    for(let j = i + 1; j < input.length; j++) {
      const secondNumber = Number(input[j]);

      for(let k = j + 1; k < input.length; k++) {
        const thirdNumber = Number(input[k]);

        const result = firstNumber + secondNumber + thirdNumber;

        if (result === 2020) {
          return firstNumber * secondNumber * thirdNumber;
        }
      }
    }
  }
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

