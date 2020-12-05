var fs = require('fs');

function triplet(expenses) {
  for(let i = 0; i < expenses.length; i++) {
    const firstNumber = Number(expenses[i]);

    for(let j = i + 1; j < expenses.length; j++) {
      const secondNumber = Number(expenses[j]);

      for(let k = j + 1; k < expenses.length; k++) {
        const thirdNumber = Number(expenses[k]);

        const result = firstNumber + secondNumber + thirdNumber;

        if (result === 2020) {
          console.log(firstNumber * secondNumber * thirdNumber);
          return;
        }
      }
    }
  }
}

function main() {
  if (!process.argv[2])
    return null;

  const inputFile = process.argv[2]
  fs.readFile(__dirname + '/' + inputFile, function(err, data) {
    if (err)
      throw err;

    const expenses = data.toString().split(/\r?\n/);
    expenses.splice(-1, 1);

    triplet(expenses);
  });
  
}

main()

