var fs = require('fs');

function duplet(expenses) {
  for(let i = 0; i < expenses.length; i++) {
    const firstNumber = Number(expenses[i]);

    for(let j = i + 1; j < expenses.length; j++) {
      const secondNumber = Number(expenses[j]);

      const result = firstNumber + secondNumber

      if (result === 2020) {
        console.log(firstNumber * secondNumber);
        return 1;
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

    duplet(expenses);
  });
  
}

main()

